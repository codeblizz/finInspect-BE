import { Schema, model } from 'mongoose';
import {
  CountryDocument,
  CountryModel
} from '../types/country.type';

export const CountrySchema: Schema = new Schema({
  country: {
    type: String,
  },
  code: {
    type: String,
  },
  os: {
    type: String,
  },
});

export const Country = model<CountryDocument, CountryModel>(
  'Country',
  CountrySchema
);
