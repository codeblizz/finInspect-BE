"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = exports.CountrySchema = void 0;
const mongoose_1 = require("mongoose");
exports.CountrySchema = new mongoose_1.Schema({
    country: {
        type: String,
    },
    code: {
        type: String,
    },
    os: {
        type: String,
    },
});
exports.Country = (0, mongoose_1.model)('Country', exports.CountrySchema);
