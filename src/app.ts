import Fastify from 'fastify';
import cors from '@fastify/cors'

import DBConnector from './helpers/useDB';
import configPlugin from './helpers/envConfig';
import authRoutes from './modules/auth/user.routes';
import { Db } from './types/model.type';

declare module 'fastify' {
  export interface FastifyInstance {
    db: Db;
    config: {
      MONGODB_URL: string;
      NODE_ENV: string;
      PORT: number;
      HOST: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_HOSTNAME: string;
      DB_NAME: string;
    };
  }
}

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

export default async function appFramework() {
  const fastify = Fastify({ logger: envToLogger['development'] ?? false });
  fastify.register(configPlugin);
  fastify.register(cors);
  await fastify.after();

  const username = encodeURIComponent(fastify.config.DB_USERNAME);
  const password = encodeURIComponent(fastify.config.DB_PASSWORD);
  const dbHost = encodeURIComponent(fastify.config.DB_HOSTNAME);

  fastify.register(DBConnector, {
    uri: `mongodb+srv://${username}:${password}@${dbHost}/?retryWrites=true&w=majority`,
  });

  fastify.register(authRoutes, { prefix: '/api' });

  return fastify;
}
