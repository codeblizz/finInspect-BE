"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const country_schema_1 = require("./schema/country.schema");
const login_schema_1 = require("./schema/login.schema");
const register_schema_1 = require("./schema/register.schema");
const userService = {
    login: async (payload) => {
        const filter = { email: payload.email };
        try {
            const isUserRegistered = await register_schema_1.Register.exists(filter);
            if (isUserRegistered) {
                const loggedUser = await login_schema_1.Login.auth(payload);
                loggedUser.status = true;
                await loggedUser.save();
                return { message: 'Login successful' };
            }
            else {
                return { message: 'User is not registered' };
            }
        }
        catch (error) {
            return new Error(error);
        }
    },
    register: async (payload) => {
        const filter = { email: payload.email };
        try {
            const isUserExist = await register_schema_1.Register.exists(filter);
            if (!isUserExist) {
                const registeredUser = await register_schema_1.Register.registerNewUser(payload);
                await registeredUser.save();
                return { message: 'Registration successful' };
            }
            else {
                return { message: 'User already exist' };
            }
        }
        catch (error) {
            return new Error(error);
        }
    },
    getCountry: async () => {
        try {
            const countryListResult = await country_schema_1.Country.find();
            return countryListResult;
        }
        catch (error) {
            return new Error(error);
        }
    },
};
exports.default = userService;
