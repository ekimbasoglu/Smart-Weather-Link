
#include <DHT.h>
#include <Servo.h>

Servo servo;
int servoPosition = 90;  // Initial servo position (90 degrees)
const int rainSensorPin = 12;  //  FC-37 rain sensor's digital output
const int sensorPin = 7; // Soil Humidity sensor input

#define DHT_TYPE DHT11   // DHT11 sensor type
#define DHT_PIN 8        // Pin where the sensor is connected
DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(9600); // Init serial
  dht.begin(); // Temp/ Humidity sensor
  pinMode(sensorPin, INPUT); // Humidty sensor
  pinMode(rainSensorPin, INPUT);  // Rain sensor
  servo.attach(2);  // Attach the servo to pin 2
  servo.write(servoPosition);  // Set the initial position
}

void measureHumidtyDigital(){
  // Read the digital value from the sensor (HIGH or LOW)
  int sensorValue = digitalRead(sensorPin);

  if (sensorValue == HIGH) {
    Serial.println("Soil is dry");
  } else {
    Serial.println("Soil is wet");
  }

}

void checkTemperatureAirHumidity(){
  float humidity = dht.readHumidity();     // Read humidity (in percentage)
  float temperatureCelsius = dht.readTemperature();  // Read temperature in Celsius
  if (isnan(humidity) || isnan(temperatureCelsius)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.print("Humidity on Air (%): ");
    Serial.println(humidity);
    Serial.print("Temperature (°C): ");
    Serial.println(temperatureCelsius);
  }
}

void checkRainSensor(){
    int rainSensorValue = digitalRead(rainSensorPin);  // Read the digital signal from the sensor
  
  if (rainSensorValue == HIGH) {
    Serial.println("rain");  // Print a message when rain is detected
  } else {
    Serial.println("no rain");  // Print a message when no rain is detected
  }
}

void checkServo(){
  if (Serial.available() > 0) {
    char command = Serial.read();
    
    // Move the servo based on user input
    if (command == 'L') {  // 'L' for left
      servoPosition -= 10;
      if (servoPosition < 0) {
        servoPosition = 0;
      }
    } else if (command == 'R') {  // 'R' for right
      servoPosition += 10;
      if (servoPosition > 180) {
        servoPosition = 180;
      }
    }
    
    // Update the servo position
    servo.write(servoPosition);
  }
}

void loop() {

  delay(1000);
  measureHumidtyDigital();
  checkTemperatureAirHumidity();
  checkRainSensor();
  delay(6500); // 6.5sec delay for readings to not spam
  checkServo();
}
