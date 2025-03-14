import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import logger from './logger';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes)
app.use('/user', userRoutes)

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
