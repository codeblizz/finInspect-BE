import { LogModel } from './../modules/auth/types/log.type';
import { CountryModel } from '../modules/auth/types/country.type';
import { UserModel } from '../modules/auth/types/user.type';

export interface Db {
  models: Models;
}

export interface Models {
  User: UserModel;
  Country: CountryModel;
  Log: LogModel
}

export interface IDBConnection {
  uri: string;
}
