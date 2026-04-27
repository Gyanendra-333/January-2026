// create complte socket controller to handle socket connections and emit events to clients
import { Server } from 'socket.io';
import redisClient from './redis.js';

const io = new Server();

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// subscribe to redis channel and emit events to clients
redisClient.subscribe('notifications');
redisClient.on('message', (channel, message) => {
    console.log(`Received message from channel ${channel}: ${message}`);
    io.emit('notification', message);
});


export default io;