"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        label: { type: String },
        value: { type: String },
    },
    countryCode: {
        label: { type: String },
        value: { type: String },
    },
    status: {
        type: Boolean
    },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    mobile: {
        type: String
    },
}, {
    timestamps: true,
});
exports.UserSchema.statics.registerNewUser = (doc) => {
    return new exports.User(doc);
};
exports.UserSchema.statics.login = (doc) => {
    return new exports.User(doc);
};
exports.User = (0, mongoose_1.model)('User', exports.UserSchema);
