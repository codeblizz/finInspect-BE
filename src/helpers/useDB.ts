import { Login, LoginModel } from './../modules/auth/login/login.schema';
import { FastifyInstance } from 'fastify';
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import mongoose, { ConnectOptions } from 'mongoose';
import {
  Register,
  RegisterModel,
} from '../modules/auth/register/register.schema';

export interface Db {
  models: Models;
}

export interface Models {
  Login: LoginModel;
  Register: RegisterModel;
}

interface IDBConnection {
  uri: string;
}

const ConnectDB: FastifyPluginAsync<IDBConnection> = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connection.on('connected', () => {
      fastify.log.info({ actor: 'MongoDB' }, 'connected');
    });
    await mongoose.connection.on('disconnected', () => {
      fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
    });
    const db = await mongoose.connect(options.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    const models: Models = { Login, Register };
    fastify.decorate('db', { models });
  } catch (error) {
    console.error(error);
  }
};
export default fp(ConnectDB);
