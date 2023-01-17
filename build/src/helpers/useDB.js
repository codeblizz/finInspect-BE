"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const mongoose_1 = __importDefault(require("mongoose"));
const register_schema_1 = require("../modules/auth/schema/register.schema");
const country_schema_1 = require("../modules/auth/schema/country.schema");
const login_schema_1 = require("../modules/auth/schema/login.schema");
const ConnectDB = async (fastify, options) => {
    mongoose_1.default.set('strictQuery', true);
    try {
        await mongoose_1.default.connection.on('open', () => {
            fastify.log.info({ actor: 'MongoDB', event: 'MongoDB connected' });
            // mongoose.connection.db.listCollections().toArray(function (err, names) {
            //   console.log(names);
            // });
        });
        await mongoose_1.default.connection.on('disconnected', () => {
            fastify.log.info({ actor: 'MongoDB', event: 'MongoDB disconnected' });
        });
        const db = await mongoose_1.default.connect(options.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const models = { Login: login_schema_1.Login, Register: register_schema_1.Register, Country: country_schema_1.Country };
        fastify.decorate('db', { models });
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = (0, fastify_plugin_1.default)(ConnectDB);
