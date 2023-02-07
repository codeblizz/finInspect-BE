import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyRedis from '@fastify/redis';
import cookie from '@fastify/cookie';
import fastifySession from '@fastify/session';

import { EnvType } from './types/env.type';
import DBConnector from './helpers/useDB';
import configPlugin from './helpers/fastifyConfig';
import authRoutes from './modules/auth/user.routes';
// import fastifyRedis from './helpers/redisClient';
import config from './helpers/config';
import { Log, envToLogger } from './helpers/logger';
import { Db } from './types/model.type';
import Redis from 'ioredis';
import { LogAttrs } from './modules/auth/types/log.type';

declare module 'fastify' {
  export interface FastifyInstance {
    db: Db;
    config: EnvType;
  }
}

export default async function appFramework() {
  const fastify = Fastify({ logger: envToLogger['development'] ?? false });
  fastify.register(cors);
  fastify.register(configPlugin);
  await fastify.after();

  const username = encodeURIComponent(fastify.config.DB_USERNAME);
  const password = encodeURIComponent(fastify.config.DB_PASSWORD);
  const dbHost = encodeURIComponent(fastify.config.DB_HOSTNAME);

  fastify.register(DBConnector, {
    uri: `mongodb+srv://${username}:${password}@${dbHost}/?retryWrites=true&w=majority`,
  });

  // fastify.register(fastifyRedis, {
  //   host: config.REDIS_HOST,
  //   password: config.REDIS_PASSWORD,
  //   port: config.REDIS_PORT,
  //   family: config.REDIS_FAMILY,
  //   maxLoadingRetryTime: config.MAX_REDIS_RETRY,
  // });
  fastify.register(cookie);
  fastify.register(fastifySession, {
    secret: fastify.config.SECRET_KEY,
    saveUninitialized: false,
    cookieName: 'cookie',
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 360000,
    },
  });
  fastify.register(authRoutes, { prefix: '/api' });
  fastify.addHook('onRequest', async (request, reply) => {
    const log: LogAttrs = {
      level: request.log.level,
      message: reply.cookies,
      statusCode: reply.statusCode,
      erpRes: {
        request: request.sessionStore,
        query: request.query,
        params: request.params,
        body: request.body,
      },
      headers: reply.headers,
      method: request.method,
      url: request.url,
      timestamp: () => new Date(),
    };
    await fastify.db.models.Log.create(log);
  });

  return fastify;
}
