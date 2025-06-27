import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger, morgan } from './config/index.js';
import { validateRequest, errorHandler, notFoundHandler } from './utils/index.js';
import connectDB  from './db/connectDB.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan({ logger }));
app.use(cors({ // <-- This is crucial for sending cookies from the frontend to the backend
    origin: ['http://localhost:5173'], // your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // allow cookies to be sent with the request
}))

app.use((req, res, next) => {
    if (req.path.startsWith('/.well-known')) {
        return res.status(404).send('Not Found');
    }
    next();
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(validateRequest);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, async () => {
    await connectDB();
    logger.info(`Server running on port ${PORT}`);
});