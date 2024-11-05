const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { SerialPort } = require('serialport');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

const port = new SerialPort({ path: '/dev/cu.usbmodem21101', baudRate: 9600 });

function toggleLed() {
    console.log('Turning LED ON');
    console.log('Photo captured');
    port.write('1'); // Turn on the LED
    setTimeout(() => {
        console.log('Turning LED OFF');
        port.write('0'); // Turn off the LED after 50 milliseconds
    }, 50);
}

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('startTakingPhotos', () => {
        console.log('Started taking photos');

        const startTime = Date.now(); // Record the start time
        const duration = 60 * 1000; // 60 seconds in milliseconds

        // Use setInterval to take photos at random intervals
        const takePhotoInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime; // Calculate elapsed time

            if (elapsedTime >= duration) {
                clearInterval(takePhotoInterval); // Stop the interval after 60 seconds
                console.log('Stopped taking photos');
                return; // Exit the function
            }

            toggleLed(); // Call the function to toggle the LED
            socket.emit('takePhoto'); // Emit the event to take a photo
        }, Math.floor(Math.random() * 400) + 1); // Random interval between 1 and 400 milliseconds

        socket.on('disconnect', () => {
            console.log('User disconnected');
            clearInterval(takePhotoInterval); // Clear the interval on disconnect
        });
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});