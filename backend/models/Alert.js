import mongoose, { mongo } from "mongoose";

const AlertSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    symbol: { type: String, required: true, uppercase: true, trim: true },
    condition: { type: String, required: true, enum: ["above", "below"] },
    targetPrice: { type: Number, required: true },
    active: { type: Boolean, default: true },
    triggeredAt: { type: Date, default: null }
}, { timestamps: true });

const Alert = mongoose.model('Alert', AlertSchema);
export default Alert;