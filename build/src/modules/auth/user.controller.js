"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const registerController = {
    login: async (request, reply) => {
        try {
            const result = await user_service_1.default.login(request.body);
            if (result.message === 'Login successful') {
                return reply.send(result);
            }
            else
                return reply.code(404).send(result);
        }
        catch (error) {
            return reply.send({
                message: error.message,
            });
        }
    },
    register: async (request, reply) => {
        try {
            const result = await user_service_1.default.register(request.body);
            if (result.message === 'Registration successful') {
                return reply.send(result);
            }
            else
                return reply.code(404).send(result);
        }
        catch (error) {
            return reply.send({
                message: error.message,
            });
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
