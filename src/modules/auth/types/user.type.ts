import { Model, Document } from "mongoose";

export interface UserAttrs {
  firstName: string;
  lastName: string;
  email: string;
  gender: { label: string, value: string };
  countryCode:  { label: string, value: string };
  mobile: string;
  status: boolean;
  password: string;
  confirmPassword: string;
}

export interface UserModel extends Model<UserDocument> {
  registerNewUser(doc: UserAttrs): UserDocument;
}

export interface UserModel extends Model<UserDocument> {
  login(doc: UserAttrs): UserDocument;
}

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  gender:  { label: string, value: string };
  countryCode:  { label: string, value: string };
  mobile: string;
  status: boolean;
  password: string;
  confirmPassword: string;
  createdAt: string;
}


