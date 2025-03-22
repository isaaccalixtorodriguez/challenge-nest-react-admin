import React, { useEffect, useState } from 'react';

import { FavoriteButton } from '../components/FavoriteButton';
import Layout from '../components/layout';
import { Favorite, favoriteService } from '../services/favorite.service';

export const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setIsLoading(true);
      const data = await favoriteService.getUserFavorites();
      setFavorites(data);
    } catch (err) {
      setError('Error al cargar los favoritos');
      console.error('Error loading favorites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-600">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Favorite Courses</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No tienes cursos favoritos aún.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {favorite.course.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {favorite.course.description}
                  </p>
                  <div className="flex justify-end">
                    <FavoriteButton courseId={favorite.course.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
