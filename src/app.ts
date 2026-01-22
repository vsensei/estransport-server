import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import liveDataRoutes from './routes/liveDataRoutes';
import staticDataRoutes from './routes/staticDataRoutes';

const app = express();

app.use(cors(), express.json());

app.use('/api/liveData', liveDataRoutes);
app.use('/api/staticData', staticDataRoutes);

app.use(errorHandler);

export default app;
