const { SerialPort, SerialPortStream } = require('serialport');

// List all serial ports
SerialPortStream.list()
  .then(ports => {
    ports.forEach(port => {
      console.log(`Port: ${port.path}`);
    });
  })
  .catch(err => console.error('Error listing ports:', err));
