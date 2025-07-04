import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { logger, morgan, connectDB } from './config/index.js';
import { validateRequest, errorHandler, notFoundHandler } from './utils/index.js';
import authRouter from './routes/auth.route.js';
import favoriteRouter from './routes/favorites.route.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser()); // if you are using http only cookie then you need to use this middleware
app.use(cors({
    origin: '*',
}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan({ logger }));

// This is for React Native to send cookies from the frontend to the backend
// app.use(cors({ // <-- This is crucial for sending cookies from the frontend to the backend
//     origin: ['http://localhost:5173'], // your frontend origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true, // allow cookies to be sent with the request
// }))

app.use((req, res, next) => {
    if (req.path.startsWith('/.well-known')) {
        return res.status(404).send('Not Found');
    }
    next();
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/favorites', favoriteRouter);

app.use(validateRequest);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, async () => {
    await connectDB();
    logger.info(`Server running on port ${PORT}`);
});