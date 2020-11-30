"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStorage = void 0;
const redis_1 = require("redis");
const util_1 = require("util");
const stateStorage_1 = require("./errors/stateStorage");
const decorators_1 = require("./helpers/decorators");
class RedisStorage {
    constructor(connection) {
        connection.on('connect', () => {
            console.info('Successfully connected to redis');
        });
        connection.on('reconnecting', () => {
            console.warn('Connection to redis lost. Reconnecting...');
        });
        connection.on('error', (err) => {
            console.error('Unexpected error', err);
        });
        this.connection = connection;
    }
    static async connect(options) {
        const storage = new RedisStorage(redis_1.createClient(options));
        return new Promise((resolve, reject) => {
            storage.connection.on('connect', () => resolve(storage));
            storage.connection.on('error', err => reject(err));
        });
    }
    async save(id, componentName, state) {
        const response = util_1.promisify(this.connection.set).bind(this.connection)(String(id), JSON.stringify([componentName, state]));
        if (response) {
            return true;
        }
        return false;
    }
    async delete(id) {
        return util_1.promisify(this.connection.del).bind(this.connection, id)();
    }
    async restore(id) {
        const stateJson = await util_1.promisify(this.connection.get).bind(this.connection)(String(id));
        if (stateJson === null) {
            throw new stateStorage_1.StateNotFound(String(id));
        }
        return JSON.parse(stateJson);
    }
}
__decorate([
    decorators_1.Required
], RedisStorage.prototype, "connection", void 0);
exports.RedisStorage = RedisStorage;
//# sourceMappingURL=redisStorage.js.map