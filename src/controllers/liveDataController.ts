import { Request, Response } from 'express';
import fs from 'fs';
import config from '../config/config';

const calculateTransportData = (gpsResponse: string) => {
  const transportCoordinatesArray = gpsResponse.split(/\n/).map((line) => {
    const [
      lineType,
      lineNumber,
      multipliedLon,
      multipliedLat,
      speedKmh,
      headingDegrees,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      vehicleNumber,
      vehicleType,
      ridesAmount,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      endStopName,
    ] = line.split(',');

    return {
      type: lineType,
      lineNumber,
      lon: Number(multipliedLon) / 1000000,
      lat: Number(multipliedLat) / 1000000,
      speed: speedKmh,
      headingDegrees,
      endStopName,
    };
  });

  return transportCoordinatesArray;
};

const getMockedTransportData = () => {
  const transportData = fs
    .readFileSync(`${config.mocksPath}/gps.txt`, 'utf-8')
    .trim();

  console.log('Got the mocked data', transportData.length);

  return calculateTransportData(transportData);
};

const fetchRemoteTransportData = async () => {
  const response = await fetch(config.transportDataUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch external file');
  }
  const text = await response.text();
  const transportData = calculateTransportData(text.trim());

  console.log('Fetched the remote data');

  return transportData;
};

export const getLiveTransportData = async (req: Request, res: Response) => {
  const transportData = config.useMockedData
    ? getMockedTransportData()
    : await fetchRemoteTransportData();

  res.json(transportData);
  console.log('transportData sent', transportData.length);
};
