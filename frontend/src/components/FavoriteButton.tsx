import React, { useEffect, useState } from 'react';

import { favoriteService } from '../services/favorite.service';

interface FavoriteButtonProps {
  courseId: string;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  courseId,
  className = '',
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, [courseId]);

  const checkFavoriteStatus = async () => {
    try {
      const favorites = await favoriteService.getUserFavorites();
      setIsFavorite(favorites.some((fav) => fav.course.id === courseId));
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    setIsLoading(true);
    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(courseId);
        setIsFavorite(false);
      } else {
        await favoriteService.addFavorite(courseId);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`
        p-2 rounded-full
        transition-colors duration-200 ease-in-out
        ${
          isFavorite
            ? 'text-red-600 hover:text-red-700'
            : 'text-gray-600 hover:text-gray-700'
        }
        ${className}
      `}
      title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <svg
        className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`}
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};
