import { Schema, model } from 'mongoose';
import {
  LoginAttrs,
  LoginDocument,
  LoginModel,
} from '../types/register.type';

export const LoginSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);

LoginSchema.statics.auth = (doc: LoginAttrs) => {
  return new Login(doc);
};

export const Login = model<LoginDocument, LoginModel>('Login', LoginSchema);
