
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

// Routes
app.get('/', (req, res) => {
    res.send('API is Working');
});

app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// Export app for Vercel
export default app;
