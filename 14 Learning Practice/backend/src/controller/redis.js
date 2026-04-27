// create a redis client use redis package and connect to redis server and export the client
import redis from 'redis';

const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis error:', err);
});

export default client;

