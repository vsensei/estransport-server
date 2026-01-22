import { Router } from 'express';
import { getLiveTransportData } from '../controllers/liveDataController';

const liveDataRouter = Router();

liveDataRouter.get('/', getLiveTransportData);

export default liveDataRouter;
