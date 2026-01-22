import fs from 'fs';
import config from '../config/config';
import { StopStationData } from '../types';

export const mockedStationsData = JSON.parse(
  fs.readFileSync(`${config.mocksPath}/stations.json`, 'utf-8'),
) as StopStationData[];

export const mockedStopsData = JSON.parse(
  fs.readFileSync(`${config.mocksPath}/stops.json`, 'utf-8'),
) as StopStationData[];
