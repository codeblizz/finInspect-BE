import { loginController } from './login.controller';
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync,
} from 'fastify';
import fp from 'fastify-plugin';

const loginRoutes: FastifyPluginAsync = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.post('/login', options, loginController);
};

export default fp(loginRoutes);
