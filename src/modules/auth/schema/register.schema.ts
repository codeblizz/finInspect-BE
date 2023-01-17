import { Schema, model } from 'mongoose';
import {
  RegisterAttrs,
  RegisterDocument,
  RegisterModel,
} from '../types/register.type';

export const RegisterSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      label: { type: String, required: true },
      value: { type: String, required: true },
    },
    countryCode: {
      label: { type: String, required: true },
      value: { type: String, required: true },
    },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    mobile: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

RegisterSchema.statics.registerNewUser = (doc: RegisterAttrs) => {
  return new Register(doc);
};

export const Register = model<RegisterDocument, RegisterModel>(
  'Register',
  RegisterSchema
);
