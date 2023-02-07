"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.LoggerSchema = exports.envToLogger = void 0;
const mongoose_1 = require("mongoose");
exports.envToLogger = {
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
exports.LoggerSchema = new mongoose_1.Schema({
    level: String,
    message: String,
    statusCode: String,
    headers: Object,
    erpRes: mongoose_1.Schema.Types.Mixed,
    method: Object,
    url: String,
}, {
    timestamps: true,
});
exports.LoggerSchema.statics.createLog = (doc) => {
    return new exports.Log(doc);
};
exports.Log = (0, mongoose_1.model)('Log', exports.LoggerSchema);
