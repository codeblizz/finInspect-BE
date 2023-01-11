import Fastify from 'fastify';
import loginRoutes from './modules/auth/login/login.routes';
import DBConnector, { Db } from './helpers/useDB';
import configPlugin from './helpers/envConfig';

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
    };
  }
}

export default async function appFramework() {
  const fastify = Fastify({ logger: false });
  fastify.register(configPlugin);
  fastify.register(loginRoutes, { prefix: '/' });

  await fastify.after();

  const username = encodeURIComponent(fastify.config.DB_USERNAME);
  const password = encodeURIComponent(fastify.config.DB_PASSWORD);
  const dbClusterName = encodeURIComponent(fastify.config.DB_CLUSTER_NAME);

  fastify.register(DBConnector, {
    uri: `mongodb+srv://${username}:${password}@${dbClusterName}.bpzete1.mongodb.net/?retryWrites=true&w=majority`,
  });

  return fastify;
}
