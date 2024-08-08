"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const console_log_colors_1 = require("console-log-colors");
const redis_1 = require("redis");
class RedisService {
    constructor() {
        this.client = (0, redis_1.createClient)({
            url: process.env.REDIS_URL || "redis://localhost:6379", // Update this with your Redis server address if it's different
        });
        this.client.on("error", (err) => console.log(console_log_colors_1.red.bgWhiteBright(`Redis client error - ${console_log_colors_1.white.bgRedBright.bold(6379)}`), err.errors));
        this.client
            .connect()
            .catch((err) => console.log(console_log_colors_1.red.bgWhiteBright(`Redis connection error  - ${console_log_colors_1.white.bgRedBright.bold(6379)}`)));
    }
    testConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.ping();
                console.log(console_log_colors_1.green.bgWhiteBright(`Redis is running on  - ${console_log_colors_1.white.bgGreenBright.bold(6379)}`));
            }
            catch (err) {
                console.log(console_log_colors_1.red.bgWhiteBright(`Redis connection failed  - ${console_log_colors_1.white.bgRedBright.bold(6379)}`));
                console.log("Redis connection failed", err);
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get:", key);
            return this.client.get(key);
        });
    }
    set(key, value, expiry) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.set(key, value, { EX: expiry });
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.del(key);
        });
    }
}
exports.RedisService = RedisService;
