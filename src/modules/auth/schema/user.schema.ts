import { Schema, model } from 'mongoose';
import {
  UserAttrs,
  UserDocument,
  UserModel,
} from '../types/user.type';

export const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      label: { type: String },
      value: { type: String },
    },
    countryCode: {
      label: { type: String },
      value: { type: String },
    },
    status: {
      type: Boolean
    },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    mobile: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.registerNewUser = (doc: UserAttrs) => {
  return new User(doc);
};

UserSchema.statics.login = (doc: UserAttrs) => {
  return new User(doc);
};

export const User = model<UserDocument, UserModel>(
  'User',
  UserSchema
);
