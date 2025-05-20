import { useState, useEffect } from 'react';
import { Spot } from '../types/firestore';
import { spotService } from '../services/spotService';

interface SpotFilters {
  type?: Spot['type'];
  amenities?: Partial<Spot['amenities']>;
  noiseLevel?: Spot['noiseLevel'];
  priceRange?: Spot['priceRange'];
  isOpen?: boolean;
}

export const useSpots = (
  initialFilters?: SpotFilters,
  userLocation?: { latitude: number; longitude: number },
  radiusInKm: number = 5
) => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<SpotFilters>(initialFilters || {});

  useEffect(() => {
    const loadSpots = async () => {
      try {
        setLoading(true);
        let results: Spot[];

        if (userLocation) {
          // If we have user location, find nearby spots first
          results = await spotService.findNearbySpots(
            userLocation.latitude,
            userLocation.longitude,
            radiusInKm
          );
        } else {
          // Otherwise get all spots
          results = await spotService.getAll();
        }

        // Apply filters if any
        if (Object.keys(filters).length > 0) {
          results = await spotService.findSpotsByFilters(filters);
        }

        setSpots(results);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadSpots();
  }, [filters, userLocation, radiusInKm]);

  const updateFilters = (newFilters: Partial<SpotFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const createSpot = async (spotData: Omit<Spot, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      return await spotService.create(spotData);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateSpot = async (id: string, data: Partial<Omit<Spot, 'id' | 'createdAt'>>) => {
    try {
      await spotService.update(id, data);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteSpot = async (id: string) => {
    try {
      await spotService.delete(id);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    spots,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    createSpot,
    updateSpot,
    deleteSpot,
  };
}; 