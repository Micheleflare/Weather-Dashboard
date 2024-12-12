import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define a City class with name and id properties
class City {
  constructor(public id: string, public name: string) {}
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '..', '..', 'db', 'db.json');

class HistoryService {
  // Read method to read from the searchHistory.json file
  private async read(): Promise<City[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return reject('Failed to read search history');
        }
        const cities: City[] = data ? JSON.parse(data) : [];
        return resolve(cities);
      });
    });
  }

  // Write method to write the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(cities), 'utf8', err => {
        if (err) {
          return reject('Failed to save search history');
        }
        return resolve();
      });
    });
  }

  // Method to get cities from the searchHistory.json file
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // Method to add a city to the searchHistory.json file
  async addCity(name: string): Promise<void> {
    const cities = await this.getCities();
    const id = new Date().getTime().toString();
    cities.push(new City(id, name));
    await this.write(cities);
  }

  // Method to remove a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    let cities = await this.getCities();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();
