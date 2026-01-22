interface Feature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    id: string;
    gid: string;
    source: string;
    source_id: string;
    name: string;
    confidence: number;
    distance: number;
    accuracy: string;
    localadmin: string;
    localadmin_gid: string;
    label: string;
  };
}

interface Address extends Feature {
  properties: {
    layer: 'address';
    housenumber: string;
    street: string;
    postalcode?: string;
    postalcode_gid?: string;
  };
}

interface Venue extends Feature {
  properties: {
    layer: 'venue';
  };
}

interface Street extends Feature {
  properties: {
    layer: 'street';
  };
}

interface Stop extends Feature {
  properties: {
    layer: 'stop';
    addendum: {
      GTFS: {
        modes: Array<'BUS' | 'TRAM' | 'RAIL'>;
        code: string;
      };
    };
  };
}

interface Station extends Feature {
  properties: {
    layer: 'station';
    housenumber: string;
    street: string;
  };
}

interface ItineraryLegsBase {
  from: {
    name: string;
  };
  to: {
    name: string;
  };
  start: {
    scheduledTime: string;
  };
  end: {
    scheduledTime: string;
  };
  duration: number;
  distance: number;
  legGeometry: {
    length: number;
    points: string;
  };
}

interface WalkItinerary extends ItineraryLegsBase {
  mode: 'WALK';
  realtimeState: null;
  trip: null;
}

interface TransportItinerary extends ItineraryLegsBase {
  mode: 'BUS' | 'TRAM' | 'RAIL';
  realtimeState: string;
  trip: {
    tripHeadsign: string;
    routeShortName: string;
  };
}

interface StopTime {
  scheduledArrival: number;
  realtimeArrival: number;
  arrivalDelay: number;
  scheduledDeparture: number;
  realtimeDeparture: number;
  departureDelay: number;
  realtime: boolean;
  realtimeState: string;
  serviceDay: number;
  headsign: string;
  trip: {
    directionId: string;
    occupancy: {
      occupancyStatus: string;
    };
    route: {
      color: string;
      desc: null;
      id: string;
      longName: string;
      shortName: string;
      mode: string;
    };
    routeShortName: string;
    tripShortName: string;
    tripHeadsign: string;
  };
}

interface StopStationData {
  code: string;
  desc: string | null;
  direction: null;
  gtfsId: string;
  id: string;
  name: string;
  lat: number;
  lon: number;
  locationType: string;
  parentStation: {
    id: string;
    gtfsId: string;
    code: string;
    vehicleMode: string;
  } | null;
  platformCode: string | null;
  vehicleMode: string | null;
  stops: null;
}

export interface AutocompleteLocationsResponse {
  features: Array<Address | Venue | Street | Stop | Station>;
}

export interface Itinerary {
  node: {
    start: string;
    end: string;
    legs: Array<WalkItinerary | TransportItinerary>;
  };
}

export interface IniteraryResponse {
  data: {
    planConnection: {
      pageInfo: {
        endCursor: string | null;
      };
      edges: Initerary[];
    };
  };
}

export interface StopInfoResponse {
  gtfsId: string;
  lat: number;
  lon: number;
  name: string;
  patterns: Array<{
    code: string;
    directionId: number;
    headsign: string;
    id: string;
    route: {
      gtfsId: string;
      shortName: string;
      longName: string;
      mode: string;
    };
  }>;
  stoptimesWithoutPatterns: StopTime[];
}

export interface StopsAndStationsDataResponse {
  data: { stopsByBbox: StopStationData[] };
}
