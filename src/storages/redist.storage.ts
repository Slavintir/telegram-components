import { ObjectId } from 'bson';
import { ClientOpts, createClient, RedisClient } from 'redis';
import { promisify } from 'util';

import { StateNotFound } from '../errors/stateStorage';

import { Required } from '../helpers/decorators';

import { ComponentState } from '../interfaces/component';
import { StateStorage } from '../interfaces/storage';

export class RedisStorage implements StateStorage {
    @Required connection!: RedisClient

    constructor(connection: RedisClient) {
        connection.on('connect', () => {
            console.info('Successfully connected to redis');
        });

        connection.on('reconnecting', () => {
            console.warn('Connection to redis lost. Reconnecting...');
        });

        connection.on('error', (err: Error) => {
            console.error('Unexpected error', err);
        });

        this.connection = connection;
    }

    static async connect(options?: ClientOpts): Promise<RedisStorage> {
        const storage = new RedisStorage(createClient(options));

        return new Promise((resolve, reject) => {
            storage.connection.on('connect', () => resolve(storage));
            storage.connection.on('error', err => reject(err));
        });
    }

    async save(id: ObjectId, componentName: string, state: ComponentState): Promise<boolean> {
        const response = promisify(this.connection.set).bind(this.connection)(String(id), JSON.stringify([componentName, state]));

        if (response) {
            return true;
        }

        return false;
    }

    async delete(id: ObjectId): Promise<number> {
        return promisify(this.connection.del).bind(this.connection, id)();
    }

    async restore<T extends ComponentState>(id: ObjectId): Promise<[string, T]> {
        const stateJson = await promisify(this.connection.get).bind(this.connection)(String(id));

        if (stateJson === null) {
            throw new StateNotFound(String(id));
        }

        return JSON.parse(stateJson);
    }
}
