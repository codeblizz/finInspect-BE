import userController from './user.controller';
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync,
} from 'fastify';
import fp from 'fastify-plugin';

const registerRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  const prefix = options.prefix;
  fastify.post(`${prefix}/auth/login`, options, userController.login);
  fastify.post(`${prefix}/auth/register`, options, userController.register);
  fastify.get(`${prefix}/country`, options, userController.getCountry);
};

export default fp(registerRoutes);
