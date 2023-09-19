
#include <DHT.h>

const int humiditySensorPin = A0;
const int sensorPin = 7; // Change this to your actual digital pin number

#define DHT_TYPE DHT11   // DHT11 sensor type
#define DHT_PIN 8        // Pin where the sensor is connected
DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(9600); // Init serial
  dht.begin();
  pinMode(sensorPin, INPUT); // Set the sensor pin as an input
}

void measureHumidtyAnalog(){

  int sensorValue = analogRead(humiditySensorPin);

  // Convert the analog reading to a percentage humidity value
  float humidityPercentage = map(sensorValue, 0, 1023, 0, 100); // Assuming a 0-100% range

  // Print the humidity value to the serial monitor
  Serial.print("Humidity on the plant (%): ");
  Serial.println(humidityPercentage);

  delay(1000); // Delay for 1 second before taking another reading
}
void measureHumidtyDigital(){
  // Read the digital value from the sensor (HIGH or LOW)
  int sensorValue = digitalRead(sensorPin);

  if (sensorValue == HIGH) {
    Serial.println("Soil is dry");
  } else {
    Serial.println("Soil is wet");
  }

  delay(1000); // Delay for 1 second before taking another reading
}

void checkTemperatureAirHumidity(){
  delay(2000);  // Wait for a few seconds between readings
  float humidity = dht.readHumidity();     // Read humidity (in percentage)
  float temperatureCelsius = dht.readTemperature();  // Read temperature in Celsius
  if (isnan(humidity) || isnan(temperatureCelsius)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.print("Humidity on Air (%): ");
    Serial.print(humidity);
    Serial.print("\tTemperature (°C): ");
    Serial.println(temperatureCelsius);
  }
}
void loop() {
  // put your main code here, to run repeatedly:
  // measureHumidtyAnalog(); // A0
  measureHumidtyDigital();
  checkTemperatureAirHumidity();
}
