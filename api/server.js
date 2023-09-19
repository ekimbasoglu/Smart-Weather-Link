const SerialPort = require("serialport").SerialPort;
// import { SerialPort } from 'serialport';

// Replace "/dev/cu.usbserial-10" with your specific serial port name
const port = new SerialPort({ path: "/dev/cu.usbserial-10", baudRate: 57600 })

port.write('main screen turn on', function (err) {
    if (err) {
        return console.log('Error on write: ', err.message)
    }
    console.log('message written')
})

// Open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message)
})
