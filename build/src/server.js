"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
async function initAppServer() {
    const app = await (0, app_1.default)();
    try {
        await app.ready();
        await app.listen({ port: app.config.PORT, host: app.config.HOST }, (err, address) => {
            console.log(`Server is now listening on ${address}`);
        });
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}
initAppServer();
