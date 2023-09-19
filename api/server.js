const SerialPort = require("serialport").SerialPort;
const Readline = require("@serialport/parser-readline");
const { ReadlineParser } = require('@serialport/parser-readline')
const express = require("express");
const cors = require('cors');
const app = express();

// Define the serial port settings
const serialPort = new SerialPort({
    path: "/dev/cu.usbserial-10",
    baudRate: 9600, // Adjust to match your Arduino's baud rate
});
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }))

// Open errors will be emitted as an error event
serialPort.on('error', function (err) {
    console.log('Error: ', err.message)
})


// Cors
app.use(cors());


// Define the GET endpoint
app.get("/read-serial-data", (req, res) => {
    // Read data from the serial port
    parser.once("data", (data) => {
        console.log("Received data from serial port:", data);
        res.send(data); // Send the received data as the HTTP response
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
