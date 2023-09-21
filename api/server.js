const SerialPort = require("serialport").SerialPort;
const Readline = require("@serialport/parser-readline");
const { ReadlineParser } = require('@serialport/parser-readline')
const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

// Socket settings for CORS
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

// Socket connection
io.on('connection', (socket) => {
    console.log('Connection has been established with browser.');
    socket.on('disconnect', () => {
        console.log('Browser client disconnected from the connection.');
    });
});

// Define the serial port settings
const serialPort = new SerialPort({
    path: "/dev/cu.usbserial-110",
    baudRate: 9600, // Adjust to match your Arduino's baud rate
});
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }))

// Open errors will be emitted as an error event
serialPort.on('error', function (err) {
    console.log('Error: ', err.message)
})

// Initialize some data (for demonstration purposes)
let dataFromArduino = {
    temperature: '',
    humidtyIndoor: '',
    humidtyPlant: '',
    rainStatus: '',
};

// Configure CORS to allow requests from 'http://localhost:4200'
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

// Cors
app.use(cors(corsOptions)); // Use the 'cors' middleware with the specified options


// Socket.io event handling
io.on("connection", (socket) => {
    console.log("A user connected");

    // Send initial data to the connected client
    // Read data from the serial port
    parser.on("data", (data) => {
        // Generate a switch that if the data starts with certain text then it will be assigned to a variable
        switch (true) {
            case data.startsWith("Humidity on Air"):
                // dataFromArduino.humidtyIndoor = data.replace("Humidity on Air: ", "");
                dataFromArduino.humidtyIndoor = data.substr(data.length - 5); // Represents for % 
                break;
            case data.startsWith("Temperature"):
                // dataFromArduino.temperature = data.replace("Temperature: ", ""); // This is for the whole data incoming from Arduino
                dataFromArduino.temperature = data.substr(data.length - 5); // Rerepsents for C
                break;
            case data.startsWith("Soil is dr"):
                // dataFromArduino.humidtyPlant = data.replace("Humidity on plant: ", "");
                dataFromArduino.humidtyPlant = data.substr(data.length - 3); // Only the dry part
                break;
            case data.startsWith("Soil is we"):
                // dataFromArduino.humidtyPlant = data.replace("Humidity on plant: ", "");
                dataFromArduino.humidtyPlant = data.substr(data.length - 3); // Only the wet part
                break;
            case data.startsWith("rai"):
                dataFromArduino.rainStatus = data.replace("rain: ", "");
                break;
            case data.startsWith("no ra"):
                dataFromArduino.rainStatus = data.replace("rain: ", "");
                break;
            default:
                break;
        }
        socket.emit("temperature", dataFromArduino.temperature);
        socket.emit("humidtyIndoor", dataFromArduino.humidtyIndoor);
        socket.emit("humidtyPlant", dataFromArduino.humidtyPlant);
        socket.emit("rainStatus", dataFromArduino.rainStatus);
        console.log(dataFromArduino);
    });

    // generate input for socketio to send data to arduino, string "R" is for servo motor
    socket.on("servo", (data) => {
        console.log(data);
        serialPort.write('R');
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the HTTP server
server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

// port.write('main screen turn on', function (err) {
//     if (err) {
//         return console.log('Error on write: ', err.message)
//     }
//     console.log('message written')
// })
