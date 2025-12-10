import Alert from "../models/Alert.js";


// POST /api/alerts
export const createAlert = async (req, res) => {
    try {
        const { symbol, condition, targetPrice } = req.body;

        if (!symbol || !condition || !targetPrice) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const alert = await Alert.create({ user: req.userId, symbol, condition, targetPrice });

        res.status(201).json({ message: "Alert created successfully", alert });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// GET /api/alerts
export const getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({ user: req.userId }).sort({ createdAt: -1 });

        res.json(alerts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// PUT /api/alerts/:id
export const updateAlert = async (req, res) => {
    try {
        const { id } = req.params;

        const allowedFields = ["symbol", "condition", "targetPrice", "active"];
        const updatedAlert = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updatedAlert[field] = req.body[field];
            }
        });

        const alert = await Alert.findOneAndUpdate({ _id: id, user: req.userId }, { $set: updatedAlert }, { new: true, runValidators: true });

        if (!alert) {
            return res.status(404).json({ message: "Alert not found" });
        }

        res.status(200).json({ message: "Alert updated", alert });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// DELETE /api/alerts/:id
export const deleteAlert = async (req, res) => {
    try {
        const { id } = req.params;

        const alert = await Alert.findOneAndDelete({ _id: id, user: req.userId });

        if (!alert) {
            return res.status(404).json({ message: "Alert not found" });
        }

        return res.status(200).json({ message: "Alert deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}