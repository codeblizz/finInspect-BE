import { CountryModel, RegisterModel, LoginModel } from '../modules/auth/types/register.type';

export interface Db {
  models: Models;
}

export interface Models {
  Login: LoginModel;
  Register: RegisterModel;
  Country: CountryModel;
}

export interface IDBConnection {
  uri: string;
}
