import { Request, Response } from 'express';
import config from '../config/config';
import { mockedStationsData, mockedStopsData } from '../const/mockedData';
import {
  fetchAutocompleteLocations,
  fetchItineraries,
  fetchStopInfo,
  fetchStops,
} from '../utils/fetchData';

export const getAutocompleteLocations = async (req: Request, res: Response) => {
  const { searchQuery } = req.params;

  if (typeof searchQuery !== 'string') {
    return res.json(400);
  }

  const routes = await fetchAutocompleteLocations(searchQuery);
  return res.json(routes);
};

const isItineraryParamsDataValid = (
  itineraryParams: Request['params'],
): itineraryParams is {
  startLat: string;
  startLon: string;
  finishLat: string;
  finishLon: string;
} => {
  const { startLat, startLon, finishLat, finishLon } = itineraryParams;
  return ![startLat, startLon, finishLat, finishLon].some(
    (param) => typeof param !== 'string',
  );
};

export const getItineraries = async (req: Request, res: Response) => {
  if (!isItineraryParamsDataValid(req.params)) {
    return res.json(400);
  }

  const itineraries = await fetchItineraries(req.params);
  return res.json(itineraries);
};

export const getStopInfo = async (req: Request, res: Response) => {
  const { stopId } = req.params;

  if (typeof stopId !== 'string') {
    return res.json(400);
  }

  const stopInfo = await fetchStopInfo(stopId);
  return res.json(stopInfo);
};

const isStopsParamsDataValid = (
  stopsParams: Request['params'],
): stopsParams is {
  minLat: string;
  minLon: string;
  maxLat: string;
  maxLon: string;
} => {
  const { minLat, minLon, maxLat, maxLon } = stopsParams;
  return ![minLat, minLon, maxLat, maxLon].some(
    (param) => typeof param !== 'string',
  );
};

export const getStops = async (req: Request, res: Response) => {
  if (!isStopsParamsDataValid(req.params)) {
    return res.json(400);
  }

  const stopInfo = config.useMockedData
    ? [...mockedStopsData, ...mockedStationsData]
    : await fetchStops(req.params);

  return res.json(stopInfo);
};
