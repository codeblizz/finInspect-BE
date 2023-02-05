import { Model, Document } from 'mongoose';

export interface LogAttrs {
  level: string,
  message: any,
  method: any,
  headers: any,
  erpRes: any,
  statusCode: any,
  url: string,
  timestamp: () => void
}

export interface LogModel extends Model<LogDocument> {
  createLog(doc: LogAttrs): LogDocument;
}

export interface LogDocument extends Document {
  level: string;
  message: string;
  headers: any;
  statusCode: any;
  erpRes: any;
  method: any;
  url: string;
  timestamp: () => void;
}
