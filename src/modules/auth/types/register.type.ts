import { Model, Document } from "mongoose";

export interface RegisterAttrs {
  firstName: string;
  lastName: string;
  email: string;
  gender: { label: string, value: string };
  countryCode:  { label: string, value: string };
  mobile: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterModel extends Model<RegisterDocument> {
  registerNewUser(doc: RegisterAttrs): RegisterDocument;
}

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


export interface RegisterDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  gender:  { label: string, value: string };
  countryCode:  { label: string, value: string };
  mobile: string;
  password: string;
  confirmPassword: string;
  createdAt: string;
}

export interface CountryAttrs {
  filter: any;
  projection: any;
}

export interface CountryModel extends Model<CountryDocument> {
  findCountry(doc: CountryAttrs): CountryDocument;
}

export interface CountryDocument extends Document {
  country: string;
  code: string;
  iso: string;
}

