int ledPin = 12; // Set the LED pin number (assuming LED is on pin 13)

void setup() {
  pinMode(ledPin, OUTPUT); // Set LED pin as output
}

void loop() {
  int onTime = random(500, 2000); // Generate a random time between 500ms and 2000ms for LED on
  int offTime = random(500, 2000); // Generate a random time between 500ms and 2000ms for LED off

  digitalWrite(ledPin, HIGH); // Turn on the LED
  delay(onTime); // Wait for the random on time
  digitalWrite(ledPin, LOW); // Turn off the LED
  delay(offTime); // Wait for the random off time
}
