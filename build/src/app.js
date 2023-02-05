"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const session_1 = __importDefault(require("@fastify/session"));
const useDB_1 = __importDefault(require("./helpers/useDB"));
const fastifyConfig_1 = __importDefault(require("./helpers/fastifyConfig"));
const user_routes_1 = __importDefault(require("./modules/auth/user.routes"));
const logger_1 = require("./helpers/logger");
async function appFramework() {
    const fastify = (0, fastify_1.default)({ logger: logger_1.envToLogger['development'] ?? false });
    fastify.register(cors_1.default);
    fastify.register(fastifyConfig_1.default);
    await fastify.after();
    const username = encodeURIComponent(fastify.config.DB_USERNAME);
    const password = encodeURIComponent(fastify.config.DB_PASSWORD);
    const dbHost = encodeURIComponent(fastify.config.DB_HOSTNAME);
    fastify.register(useDB_1.default, {
        uri: `mongodb+srv://${username}:${password}@${dbHost}/?retryWrites=true&w=majority`,
    });
    // fastify.register(fastifyRedis, {
    //   host: config.REDIS_HOST,
    //   password: config.REDIS_PASSWORD,
    //   port: config.REDIS_PORT,
    //   family: config.REDIS_FAMILY,
    //   maxLoadingRetryTime: config.MAX_REDIS_RETRY,
    // });
    fastify.register(cookie_1.default);
    fastify.register(session_1.default, {
        secret: fastify.config.SECRET_KEY,
        saveUninitialized: false,
        cookieName: 'cookie',
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 360000,
        },
    });
    fastify.register(user_routes_1.default, { prefix: '/api' });
    fastify.addHook('onRequest', async (request, reply) => {
        const log = {
            level: request.log.level,
            message: reply.cookies,
            statusCode: reply.statusCode,
            erpRes: {
                request: request.sessionStore,
                query: request.query,
                params: request.params,
                body: request.body,
            },
            headers: reply.headers,
            method: request.method,
            url: request.url,
            timestamp: () => new Date(),
        };
        await fastify.db.models.Log.create(log);
    });
    return fastify;
}
exports.default = appFramework;
