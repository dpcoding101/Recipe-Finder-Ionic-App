import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpoonService {
  private apiKey = '70759a4f7911402abcc53d3c51d3b759';
  private base = 'https://api.spoonacular.com';
  private favKey = 'G00398731_favs';
  private measurementKey = 'G00398731_measurement';

  async searchByIngredients(query: string): Promise<any[]> {
    // Uses complex search endpoint - using 'complexSearch' to match assignment
    const url = `${this.base}/recipes/complexSearch?query=${encodeURIComponent(query)}&number=20&apiKey=${this.apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Search failed');
    const data = await res.json();
    return data.results || [];
  }

  async getRecipeInformation(id: number): Promise<any> {
    const url = `${this.base}/recipes/${id}/information?includeNutrition=false&apiKey=${this.apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to get recipe');
    return await res.json();
  }

  getFavourites(): string[] {
    try {
      const raw = localStorage.getItem(this.favKey);
      return raw ? JSON.parse(raw) : [];
    } catch(e) { return []; }
  }

  toggleFavourite(id: string): boolean {
    const favs = this.getFavourites();
    const idx = favs.indexOf(id);
    if (idx === -1) {
      favs.push(id);
      localStorage.setItem(this.favKey, JSON.stringify(favs));
      return true;
    } else {
      favs.splice(idx, 1);
      localStorage.setItem(this.favKey, JSON.stringify(favs));
      return false;
    }
  }

  getMeasurement(): string {
    try {
      const m = localStorage.getItem(this.measurementKey);
      return m || 'metric';
    } catch(e) { return 'metric'; }
  }

  setMeasurement(m: string) {
    localStorage.setItem(this.measurementKey, m);
  }
}
