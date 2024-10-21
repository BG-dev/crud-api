"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const requestHandler_1 = require("./services/requestHandler");
dotenv_1.default.config();
const port = Number(process.env.PORT) || 4000;
const server = http_1.default.createServer(requestHandler_1.requestHandler);
server.listen(port, () => console.log(`SERVER IS RUNNING ON PORT: ${port}`));
//# sourceMappingURL=index.js.map