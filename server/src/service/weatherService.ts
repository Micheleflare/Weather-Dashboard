import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  constructor(
    public city: string,
    public temperature: number,
    public description: string,
    public icon: string,
    public date: string,
    public windSpeed: number,
    public humidity: number
  ) {}
}

class WeatherService {
  private baseURL: string = process.env.API_BASE_URL || '';
  private apiKey: string = process.env.API_KEY || '';
  private cityName: string = '';

  private async fetchLocationData(query: string): Promise<any> {
    const url = `${this.baseURL}/geo/1.0/direct?q=${query}&appid=${this.apiKey}`;
    const response = await axios.get(url);
    return response.data;
  }

  private destructureLocationData(locationData: any): Coordinates {
    if (!locationData || locationData.length === 0) {
      throw new Error('Location data not found');
    }
    const { lat, lon } = locationData[0];
    return { lat, lon };
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }

  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    const response = await axios.get(url);
    return response.data;
  }

  private parseCurrentWeather(response: any): Weather {
    const current = response.list[0];
    return new Weather(
      response.city.name,
      current.main.temp,
      current.weather[0].description,
      current.weather[0].icon,
      current.dt_txt,
      current.wind.speed,
      current.main.humidity
    );
  }

  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecastArray: Weather[] = [currentWeather];
    for (let i = 1; i < weatherData.length; i += 8) {
      const dataPoint = weatherData[i];
      const weather = new Weather(
        this.cityName,
        dataPoint.main.temp,
        dataPoint.weather[0].description,
        dataPoint.weather[0].icon,
        dataPoint.dt_txt,
        dataPoint.wind.speed,
        dataPoint.main.humidity
      );
      forecastArray.push(weather);
    }
    return forecastArray;
  }

  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);
    return forecastArray;
  }
}

export default new WeatherService();
