"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const registerController = {
    login: async (request, reply) => {
        const { sessionId } = request.session;
        try {
            const result = await user_service_1.default.login(request.body);
            if (result.status === false)
                reply.code(404);
            return reply.send(result);
        }
        catch (error) {
            return reply.send(error);
        }
    },
    register: async (request, reply) => {
        try {
            const result = await user_service_1.default.register(request.body);
            if (result.status === false)
                reply.code(404);
            return reply.send(result);
        }
        catch (error) {
            console.log('error', error);
            return reply.send(error);
        }
    },
    getCountry: async (request, reply) => {
        try {
            const result = await user_service_1.default.getCountry();
            return reply.send(result);
        }
        catch (error) {
            return reply.send({
                message: error.message,
            });
        }
    },
};
exports.default = registerController;
