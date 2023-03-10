import { FastifyInstance } from 'fastify';
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import mongoose, { ConnectOptions } from 'mongoose';
import { IDBConnection, Models } from '../types/model.type';
import { Country } from '../modules/auth/schema/country.schema';
import { User } from '../modules/auth/schema/user.schema';
import { Log } from './logger';

const ConnectDB: FastifyPluginAsync<IDBConnection> = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connection.on('open', () => {
      fastify.log.info({ actor: 'MongoDB', event: 'MongoDB connected' });
      // mongoose.connection.db.listCollections().toArray(function (err, names) {
      //   console.log(names);
      // });
    });
    await mongoose.connection.on('disconnected', () => {
      fastify.log.info({ actor: 'MongoDB', event: 'MongoDB disconnected' });
    });
    const db = await mongoose.connect(options.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    const models: Models = { User, Country, Log };
    fastify.decorate('db', { models });
  } catch (error) {
    console.error(error);
  }
};
export default fp(ConnectDB);
