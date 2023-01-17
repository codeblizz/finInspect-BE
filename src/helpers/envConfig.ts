import fp from 'fastify-plugin';
// @ts-ignore
import fastifyEnv from '@fastify/env';

async function configPlugin(server: any, options: any, done: any) {
  const schema = {
    type: 'object',
    required: ['MONGODB_URL'],
    properties: {
      MONGODB_URL: {
        type: 'string',
      },
      PORT: {
        type: 'number',
      },
      HOST: {
        type: 'string',
      },
      NODE_ENV: {
        type: 'string',
        default: 'development'
      },
      DEBUG_LEVEL: {
        type: 'number',
        default: 1000,
      },
      DB_USERNAME: { type: 'string' },
      DB_PASSWORD: { type: 'string' },
      DB_HOSTNAME: { type: 'string' },
      DB_NAME: { type: 'string' }
    },
  };

  const configOptions = {
    confKey: 'config',
    schema,
    dotenv: true,
    data: process.env,
  };

  return fastifyEnv(server, configOptions, done);
}

export default fp(configPlugin);
