// lib/redis.js
import { createClient } from 'redis';

let client;

export const getRedisClient = async () => {
    if (!client) {
        client = createClient({
            username: 'default',
            password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
            socket: {
                host: process.env.NEXT_PUBLIC_REDIS_SOCKET_HOST,
                port: 18584
            }
        });
        client.on('error', (err) => console.error('Redis Client Error:', err));
        await client.connect();
    }
    return client;
};
