const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Function to generate random data
function generateData() {
    return {
        temperature: (Math.random() * 30 + 15).toFixed(2),
        humidityIndoor: (Math.random() * 30 + 40).toFixed(2),
        humidityPlant: (Math.random() * 30 + 30).toFixed(2),
        rainStatus: Math.random() < 0.5 ? 'Raining' : 'Not Raining',
    };
}

// Socket.io connection handler
io.on('connection', (socket) => {
    console.log('Client connected');

    // Emit data every 3 seconds
    const interval = setInterval(() => {
        const data = generateData();
        socket.emit('data', data);
    }, 3000);

    // Disconnect handler
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
