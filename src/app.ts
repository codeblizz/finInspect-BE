import Fastify from 'fastify';
import loginRoutes from './modules/auth/login/login.routes';
import DBConnector, { Db } from './helpers/useDB';
import configPlugin from './helpers/envConfig';
import cors from '@fastify/cors';
import redisClient from '@fastify/redis';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import fastifySwagger from '@fastify/swagger';

declare module 'fastify' {
  export interface FastifyInstance {
    db: Db;
    config: {
      MONGODB_URL: string;
      PORT: number;
      HOST: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_CLUSTER_NAME: string;
      REDIS_HOST: string;
      REDIS_PASSWORD: string;
      REDIS_PORT: number;
      REDIS_FAMILY: number;
      SESSION_SECRET: string;
    };
  }
}

export default async function appFramework() {
  const fastify = Fastify({ logger: false });
  fastify.register(configPlugin);
  fastify.register(loginRoutes, { prefix: '/' });
  fastify.register(fastifyCookie);
  
  await fastify.after();
  await fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'code', description: 'Code related end-points' },
      ],
      definitions: {
        User: {
          type: 'object',
          required: ['id', 'email'],
          properties: {
            id: { type: 'string', format: 'uuid' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
        },
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
  })

  fastify.register(fastifySession, { secret: fastify.config.SESSION_SECRET});
  await fastify.register(cors, {});
  // await fastify.register(redisClient, {
    // host: fastify.config.REDIS_HOST,
    // password: fastify.config.REDIS_PASSWORD,
    // port: fastify.config.REDIS_PORT,
    // family: fastify.config.REDIS_FAMILY, 
  // });
  const username = encodeURIComponent(fastify.config.DB_USERNAME);
  const password = encodeURIComponent(fastify.config.DB_PASSWORD);
  const dbClusterName = encodeURIComponent(fastify.config.DB_CLUSTER_NAME);

  fastify.register(DBConnector, {
    uri: `mongodb+srv://${username}:${password}@${dbClusterName}.bpzete1.mongodb.net/?retryWrites=true&w=majority`,
  });

  return fastify;
}
