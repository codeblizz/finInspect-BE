import { Country } from './schema/country.schema';
import { Login } from './schema/login.schema';
import { Register } from './schema/register.schema';

const userService = {
  login: async (payload: any) => {
    const filter = { email: payload.email };
    try {
      const isUserRegistered = await Register.exists(filter);
      if (isUserRegistered) {
        const loggedUser = await Login.auth(payload);
        loggedUser.status = true;
        await loggedUser.save();
        return { message: 'Login successful' };
      } else {
        return { message: 'User is not registered' };
      }
    } catch (error:any) {
      return new Error(error);
    }
  },
  register: async (payload: any) => {
    const filter = { email: payload.email };
    try {
      const isUserExist = await Register.exists(filter);
      if (!isUserExist) {
        const registeredUser = await Register.registerNewUser(payload);
        await registeredUser.save();
        return { message: 'Registration successful' };
      } else {
        return { message: 'User already exist' };
      }
    } catch (error:any) {
      return new Error(error);
    }
  },
  getCountry: async () => {
    try {
      const countryListResult = await Country.find();
      return countryListResult;
    } catch (error:any) {
      return new Error(error);
    }
  },
};

export default userService;
