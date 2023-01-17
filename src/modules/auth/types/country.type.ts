import { Model, Document } from "mongoose";

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

