"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.LoginSchema = void 0;
const mongoose_1 = require("mongoose");
exports.LoginSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});
exports.LoginSchema.statics.auth = (doc) => {
    return new exports.Login(doc);
};
exports.Login = (0, mongoose_1.model)('Login', exports.LoginSchema);
