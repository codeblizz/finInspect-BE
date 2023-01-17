"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.RegisterSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RegisterSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        label: { type: String, required: true },
        value: { type: String, required: true },
    },
    countryCode: {
        label: { type: String, required: true },
        value: { type: String, required: true },
    },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    mobile: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.RegisterSchema.statics.registerNewUser = (doc) => {
    return new exports.Register(doc);
};
exports.Register = (0, mongoose_1.model)('Register', exports.RegisterSchema);
