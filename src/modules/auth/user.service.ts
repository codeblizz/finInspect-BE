import config from '../../helpers/config';
import { Country } from './schema/country.schema';
import { User } from './schema/user.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userService = {
  login: async (payload: any) => {
    const filter = { email: payload.email };
    const projection = {};
    try {
      const user = await User.findOne(filter, projection);
      if (user) {
        const isEqualPassword = await bcrypt.compare(
          payload.password,
          user.password
        );
        if (isEqualPassword) {
          const loggedUser = await User.login(payload);
          loggedUser.status = true;
          loggedUser.firstName = user.firstName;
          loggedUser.lastName = user.lastName;
          const userProfile = {
            email: loggedUser.email,
            isLoggedIn: loggedUser.status,
            firstName: loggedUser.firstName,
            lastName: loggedUser.lastName
          }
          const accessToken = jwt.sign(
            { email: loggedUser.email },
            config.JWT_SECRET,
            { expiresIn: '1d' }
          );
          const refreshToken = jwt.sign(
            { email: loggedUser.email },
            config.JWT_SECRET,
            { expiresIn: '14d' }
          )
          return { userProfile, accessToken, refreshToken, message: 'Login successful', status: true };
        } else {
          return { message: 'Passwords do not match', status: false };
        }
      } else {
        return { message: 'User is not registered', status: false };
      }
    } catch (error: any) {
      return new Error(error);
    }
  },
  register: async (payload: any) => {
    const filter = { email: payload.email };
    try {
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      const userEmail = await User.findOne(filter, { email: 1 });
      if(!userEmail) {
        let registeredUser = await User.registerNewUser({
          ...payload,
          password: hashedPassword,
          confirmPassword: hashedPassword,
        });
        await registeredUser.save();
        return { message: 'Registration successful', status: true };
      } 
      else return { message: 'User already exist', status: false };
    } catch (error: any) {
      return new Error(error);
    }
  },
  getCountry: async () => {
    try {
      const countryListResult = await Country.find();
      return countryListResult;
    } catch (error: any) {
      return new Error(error);
    }
  },
};

export default userService;
