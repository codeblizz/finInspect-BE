import { Schema, model } from 'mongoose';
import {
  LogAttrs,
  LogDocument,
  LogModel,
} from '../modules/auth/types/log.type';

export const envToLogger = {
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
};

export const LoggerSchema: Schema = new Schema(
  {
    level: String,
    message: String,
    statusCode: String,
    headers: Object,
    erpRes: Schema.Types.Mixed,
    method: Object,
    url: String,
  },
  {
    timestamps: true,
  }
);

LoggerSchema.statics.createLog = (doc: LogAttrs) => {
  return new Log(doc);
};

export const Log = model<LogDocument, LogModel>('Log', LoggerSchema);
