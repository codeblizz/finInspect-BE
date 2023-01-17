import { Model, Document } from "mongoose";

export interface LoginAttrs {
  email: string;
  password: string;
  status: boolean;
}

export interface LoginModel extends Model<LoginDocument> {
  auth(doc: LoginAttrs): LoginDocument;
}

export interface LoginDocument extends Document {
  email: string;
  password: string;
  status: boolean;
  createdAt: string;
}


