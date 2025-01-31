const int ledPin = 13; // Pin where the LED is connected

void setup() {
    pinMode(ledPin, OUTPUT); // Set the LED pin as an output
    Serial.begin(9600); // Start serial communication at 9600 baud rate
}

void loop() {
    if (Serial.available() > 0) {
        char command = Serial.read(); // Read the incoming byte

        if (command == '1') {
            digitalWrite(ledPin, HIGH); // Turn the LED on
        } else if (command == '0') {
            digitalWrite(ledPin, LOW); // Turn the LED off
        }
    }
}