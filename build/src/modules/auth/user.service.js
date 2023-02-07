"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../helpers/config"));
const country_schema_1 = require("./schema/country.schema");
const user_schema_1 = require("./schema/user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService = {
    login: async (payload) => {
        const filter = { email: payload.email };
        const projection = {};
        try {
            const user = await user_schema_1.User.findOne(filter, projection);
            if (user) {
                const isEqualPassword = await bcrypt_1.default.compare(payload.password, user.password);
                if (isEqualPassword) {
                    const loggedUser = await user_schema_1.User.login(payload);
                    loggedUser.status = true;
                    loggedUser.firstName = user.firstName;
                    loggedUser.lastName = user.lastName;
                    const userProfile = {
                        email: loggedUser.email,
                        isLoggedIn: loggedUser.status,
                        firstName: loggedUser.firstName,
                        lastName: loggedUser.lastName
                    };
                    const accessToken = jsonwebtoken_1.default.sign({ email: loggedUser.email }, config_1.default.JWT_SECRET, { expiresIn: '1d' });
                    const refreshToken = jsonwebtoken_1.default.sign({ email: loggedUser.email }, config_1.default.JWT_SECRET, { expiresIn: '14d' });
                    return { userProfile, accessToken, refreshToken, message: 'Login successful', status: true };
                }
                else {
                    return { message: 'Passwords do not match', status: false };
                }
            }
            else {
                return { message: 'User is not registered', status: false };
            }
        }
        catch (error) {
            return new Error(error);
        }
    },
    register: async (payload) => {
        const filter = { email: payload.email };
        try {
            const hashedPassword = await bcrypt_1.default.hash(payload.password, 10);
            const userEmail = await user_schema_1.User.findOne(filter, { email: 1 });
            if (!userEmail) {
                let registeredUser = await user_schema_1.User.registerNewUser({
                    ...payload,
                    password: hashedPassword,
                    confirmPassword: hashedPassword,
                });
                await registeredUser.save();
                return { message: 'Registration successful', status: true };
            }
            else
                return { message: 'User already exist', status: false };
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
