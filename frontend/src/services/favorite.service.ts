import apiService from './ApiService';

export interface Favorite {
  id: string;
  course: {
    id: string;
    name: string;
    description: string;
    dateCreated: string;
  };
  createdAt: string;
  updatedAt: string;
}

class FavoriteService {
  async addFavorite(courseId: string): Promise<Favorite> {
    const response = await apiService.post(`/api/favorites/${courseId}`);
    return response.data;
  }

  async removeFavorite(courseId: string): Promise<void> {
    await apiService.delete(`/api/favorites/${courseId}`);
  }

  async getUserFavorites(): Promise<Favorite[]> {
    const response = await apiService.get('/api/favorites');
    return response.data;
  }
}

export const favoriteService = new FavoriteService();
