import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  apiKey: string | null;
  apiUrl: string;
  mocksPath: string;
  transportDataUrl: string;
  useMockedData: boolean;
}

const config: Config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiKey: process.env.DIGITRANSIT_API_KEY || null,
  apiUrl: process.env.DIGITRASNIT_URL || '',
  mocksPath: `${__dirname}/../localMocks`,
  transportDataUrl: process.env.LIVE_DATA_URL || '',
  useMockedData: process.env.USE_MOCKED_DATA === 'true',
};

export default config;
