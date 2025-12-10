import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import alertRouter from './routes/alertRoutes.js';
import priceRouter from './routes/priceRoutes.js';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB not connected", error);
    }
};

connectDB();

app.use('/api/users/', userRouter);
app.use('/api/alerts/', alertRouter);
app.use('/api/price/', priceRouter);

app.listen(PORT, () => {
    console.log(`Server connected to port ${PORT}`);
})
