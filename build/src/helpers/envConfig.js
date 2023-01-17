"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
// @ts-ignore
const env_1 = __importDefault(require("@fastify/env"));
async function configPlugin(server, options, done) {
    const schema = {
        type: 'object',
        required: ['MONGODB_URL'],
        properties: {
            MONGODB_URL: {
                type: 'string',
            },
            PORT: {
                type: 'number',
            },
            HOST: {
                type: 'string',
            },
            NODE_ENV: {
                type: 'string',
                default: 'development'
            },
            DEBUG_LEVEL: {
                type: 'number',
                default: 1000,
            },
            DB_USERNAME: { type: 'string' },
            DB_PASSWORD: { type: 'string' },
            DB_HOSTNAME: { type: 'string' },
            DB_NAME: { type: 'string' }
        },
    };
    const configOptions = {
        confKey: 'config',
        schema,
        dotenv: true,
        data: process.env,
    };
    return (0, env_1.default)(server, configOptions, done);
}
exports.default = (0, fastify_plugin_1.default)(configPlugin);
