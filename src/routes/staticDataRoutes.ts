import { Router } from 'express';
import {
  getAutocompleteLocations,
  getItineraries,
  getStopInfo,
  getStops,
} from '../controllers/staticDataController';

const staticDataRouter = Router();

staticDataRouter.get('/autocomplete/:searchQuery', getAutocompleteLocations);
staticDataRouter.get('/stopInfo/:stopId', getStopInfo);
staticDataRouter.get('/stops/:minLat/:minLon/:maxLat/:maxLon', getStops);
staticDataRouter.get(
  '/itinerary/:startLat/:startLon/:finishLat/:finishLon',
  getItineraries,
);

export default staticDataRouter;
