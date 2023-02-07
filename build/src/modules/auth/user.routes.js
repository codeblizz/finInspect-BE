"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("./user.controller"));
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const registerRoutes = async (fastify, options) => {
    const prefix = options.prefix;
    fastify.post(`${prefix}/auth/login`, options, user_controller_1.default.login);
    fastify.post(`${prefix}/auth/register`, options, user_controller_1.default.register);
    fastify.get(`${prefix}/country`, options, user_controller_1.default.getCountry);
};
exports.default = (0, fastify_plugin_1.default)(registerRoutes);
