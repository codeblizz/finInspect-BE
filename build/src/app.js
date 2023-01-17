"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const useDB_1 = __importDefault(require("./helpers/useDB"));
const envConfig_1 = __importDefault(require("./helpers/envConfig"));
const user_routes_1 = __importDefault(require("./modules/auth/user.routes"));
const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
    production: true,
    test: false,
};
async function appFramework() {
    const fastify = (0, fastify_1.default)({ logger: envToLogger['development'] ?? false });
    fastify.register(envConfig_1.default);
    fastify.register(cors_1.default);
    await fastify.after();
    const username = encodeURIComponent(fastify.config.DB_USERNAME);
    const password = encodeURIComponent(fastify.config.DB_PASSWORD);
    const dbHost = encodeURIComponent(fastify.config.DB_HOSTNAME);
    fastify.register(useDB_1.default, {
        uri: `mongodb+srv://${username}:${password}@${dbHost}/?retryWrites=true&w=majority`,
    });
    fastify.register(user_routes_1.default, { prefix: '/api' });
    return fastify;
}
exports.default = appFramework;
