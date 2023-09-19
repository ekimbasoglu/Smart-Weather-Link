const SerialPort = require("serialport").SerialPort;
const Readline = require("@serialport/parser-readline");
const { ReadlineParser } = require('@serialport/parser-readline')
const express = require("express");
const cors = require('cors');
const app = express();
const io = require('socket.io')(3001);

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
    humidtyPlant: ''
};

// Cors
app.use(cors());

// Socket.io event handling
io.on("connection", (socket) => {
    console.log("A user connected");

    // Send initial data to the connected client
    // Read data from the serial port
    parser.on("data", (data) => {
        // Generate a switch that if the data starts with certain text then it will be assigned to a variable
        switch (true) {
            case data.startsWith("Humidity on Air"):
                dataFromArduino.humidtyIndoor = data.replace("Humidity on Air: ", "");
                break;
            case data.startsWith("Temperature"):
                dataFromArduino.temperature = data.replace("Temperature: ", "");
                break;
            case data.startsWith("Soil is dr"):
                dataFromArduino.humidtyOnPlant = data.replace("Humidity on plant: ", "");
                break;
            case data.startsWith("Soil is we"):
                dataFromArduino.humidtyOnPlant = data.replace("Humidity on plant: ", "");
                break;
            default:
                break;
        }

        io.emit("data", dataFromArduino);
        console.log(dataFromArduino);
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the HTTP server
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

// port.write('main screen turn on', function (err) {
//     if (err) {
//         return console.log('Error on write: ', err.message)
//     }
//     console.log('message written')
// })
