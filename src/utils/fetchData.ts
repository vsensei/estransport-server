import config from '../config/config';
import {
  AutocompleteLocationsResponse,
  IniteraryResponse,
  StopInfoResponse,
  StopsAndStationsDataResponse,
} from '../types';
import {
  buildItineraryQuery,
  buildStopInfoQuery,
  buildStopsQuery,
} from './buildQuery';

const fetchAutocompleteLocationsBase = {
  url: `${config.apiUrl}/geocoding/v1/autocomplete`,
  searchParams: {
    lang: 'en',
    'boundary.country': 'EST',
    'focus.point.lat': '59.44',
    'focus.point.lon': '24.72',
    size: '10',
    layers: 'stop,station,venue,street',
  },
};

const fetchData = (
  query: {
    query: string;
  },
  apiKey: string,
) =>
  fetch(`${config.apiUrl}/routing/v2/finland/gtfs/v1`, {
    method: 'POST',
    headers: {
      'digitransit-subscription-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  });

export const fetchAutocompleteLocations = async (searchQuery: string) => {
  if (!config.apiKey) {
    throw new Error('No API key');
  }

  const url = new URL(fetchAutocompleteLocationsBase.url);
  const params = new URLSearchParams(
    fetchAutocompleteLocationsBase.searchParams,
  );
  params.set('text', searchQuery);
  url.search = params.toString();

  const response = await fetch(url, {
    headers: {
      'digitransit-subscription-key': config.apiKey,
    },
  });

  const locations = (await response.json()) as AutocompleteLocationsResponse;

  return locations.features;
};

export const fetchItineraries = async (itineraryParams: {
  startLat: string;
  startLon: string;
  finishLat: string;
  finishLon: string;
}) => {
  console.log('itineraryParams', itineraryParams);

  if (!config.apiKey) {
    throw new Error('No API key');
  }

  const query = buildItineraryQuery(itineraryParams);
  const response = await fetchData(query, config.apiKey);
  const itineraries = (await response.json()) as IniteraryResponse;

  return itineraries;
};

export const fetchStopInfo = async (stopId: string) => {
  if (!config.apiKey) {
    throw new Error('No API key');
  }

  const query = buildStopInfoQuery(stopId);
  const response = await fetchData(query, config.apiKey);
  const stopInfo = (await response.json()) as StopInfoResponse;

  return stopInfo;
};

export const fetchStops = async (stopsParams: {
  minLat: string;
  minLon: string;
  maxLat: string;
  maxLon: string;
}) => {
  if (!config.apiKey) {
    throw new Error('No API key');
  }

  const query = buildStopsQuery(stopsParams);
  const response = await fetchData(query, config.apiKey);
  const stopsResponse = (await response.json()) as StopsAndStationsDataResponse;

  return stopsResponse.data.stopsByBbox;
};
