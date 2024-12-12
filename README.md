# Weather Dashboard

A dynamic and user-friendly weather dashboard application that provides current and 5-day weather forecasts for cities worldwide. Built using the OpenWeather API, the application allows users to search for cities, view weather data, and maintain a search history for quick access to previously viewed cities.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Information](#api-information)
- [Deployed Application](#deployed-application)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features
- Search for current weather and 5-day forecasts by city name.
- Display detailed weather information including:
  - City name
  - Date
  - Temperature
  - Humidity
  - Wind speed
  - Weather condition icons and descriptions.
- Maintain a search history that allows users to revisit previous searches.
- Responsive design for optimal viewing on devices of all sizes.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **API:** OpenWeather API
- **File System:** JSON file for storing search history
- **Deployment:** Render

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Micheleflare/Weather-Dashboard.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Weather-Dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```env
   API_KEY=your_openweather_api_key
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Usage
1. Open the application in your browser:
   ```
   http://localhost:3000
   ```
2. Use the search bar to enter a city name.
3. View the current weather and 5-day forecast for the selected city.
4. Click on a city in the search history to reload its weather data.

## API Information
This project utilizes the [OpenWeather 5-Day Weather Forecast API](https://openweathermap.org/forecast5). The API provides detailed weather data, including temperature, humidity, wind speed, and weather condition descriptions.

### Example API Request:
```url
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}
```

## Deployed Application
The application is live and can be accessed at:
[Weather Dashboard on Render](https://your-render-app-url)

## Screenshots
### Search and Results
![Weather Dashboard - Search and Results](./assets/screenshot-search-results.png)

### 5-Day Forecast
![Weather Dashboard - 5-Day Forecast](./assets/screenshot-5-day-forecast.png)

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

### Author
[Michele Flare](https://github.com/Micheleflare)

