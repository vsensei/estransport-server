export const buildItineraryQuery = ({
  startLat,
  startLon,
  finishLat,
  finishLon,
}: {
  startLat: string;
  startLon: string;
  finishLat: string;
  finishLon: string;
}) => ({
  //dateTime: {earliestDeparture: "2026-01-09T16:15+03:00"}
  query: `{
  planConnection(
    origin: {
      location: {
        coordinate: {
          latitude: ${startLat},
          longitude: ${startLon}
        }
      }
    }
    destination: {
      location: {
        coordinate: {
          latitude: ${finishLat},
          longitude: ${finishLon}
        }
      }
    }
    first: 2
    modes: {
      transit: {
        transit: [{mode: BUS}, {mode: RAIL}, {mode: TRAM}]
      }
    }) {
    pageInfo {
      endCursor
    }
    edges {
      node {
        start
        end
        legs {
          from {
            name
            lat
            lon
            name
            stop {
              code
              gtfsId
              id
            }
          }
          to {
            name
            lat
            lon
            name
            stop {
              code
              gtfsId
              id
            }
          }
          start {
            scheduledTime
          }
          end {
            scheduledTime
          }
          mode
          duration
          realtimeState
          distance
          trip {
            tripHeadsign
            routeShortName
          }
          legGeometry {
            length
            points
          }
        }
      }
    }
  }
}`,
});

export const buildStopInfoQuery = (stopId: string) => ({
  query: `{
  stop(id: "${stopId}") {
    gtfsId
    lat
    lon
    patterns {
      code
      directionId
      headsign
      id
      route {
        gtfsId
        shortName
        longName
        mode
      }
    }
    name
    stoptimesWithoutPatterns(numberOfDepartures: 5) {
      scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      realtime
      realtimeState
      serviceDay
      headsign
      trip {
      directionId
      occupancy {
          occupancyStatus
      }
      route {
        color
        desc
        id
        longName
        shortName
        mode
      }
      routeShortName
      tripShortName
      tripHeadsign
      }
    }
  }
}`,
});

export const buildStopsQuery = ({
  minLat,
  minLon,
  maxLat,
  maxLon,
}: {
  minLat: string;
  minLon: string;
  maxLat: string;
  maxLon: string;
}) => ({
  query: `{
	stopsByBbox(feeds: "Viro" minLat:${minLat} minLon:${minLon} maxLat:${maxLat} maxLon:${maxLon}) {
    code
    desc
    direction
    gtfsId
    id
    name
    lat
    lon
    locationType
    parentStation {
      id
      gtfsId
      code
      vehicleMode
    }
    platformCode
    vehicleMode
    stops {
      id
      gtfsId
      code
      vehicleMode
    }
  }
}`,
});
