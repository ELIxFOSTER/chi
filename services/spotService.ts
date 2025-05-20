import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { BaseAPI } from './api.ts';
import { Spot, COLLECTIONS } from '../types/firestore.ts';

class SpotService extends BaseAPI<Spot> {
  constructor() {
    super(COLLECTIONS.SPOTS);
  }

  // Find spots near a location
  async findNearbySpots(latitude: number, longitude: number, radiusInKm: number) {
    // Note: This is a simplified version. For production, you'd want to use
    // a geospatial query solution like GeoFirestore
    const spots = await this.getAll();
    return spots.filter(spot => {
      const distance = this.calculateDistance(
        latitude,
        longitude,
        spot.address.coordinates.latitude,
        spot.address.coordinates.longitude
      );
      return distance <= radiusInKm;
    });
  }

  // Find spots by filters
  async findSpotsByFilters(filters: {
    type?: Spot['type'];
    amenities?: Partial<Spot['amenities']>;
    noiseLevel?: Spot['noiseLevel'];
    priceRange?: Spot['priceRange'];
    isOpen?: boolean;
  }) {
    let query: FirebaseFirestoreTypes.Query<Spot> = firestore().collection(this.collection);

    if (filters.type) {
      query = query.where('type', '==', filters.type);
    }

    if (filters.noiseLevel) {
      query = query.where('noiseLevel', '==', filters.noiseLevel);
    }

    if (filters.priceRange) {
      query = query.where('priceRange', '==', filters.priceRange);
    }

    if (filters.isOpen) {
      const now = new Date();
      const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      query = query.where(`operatingHours.${dayOfWeek}.isOpen`, '==', true);
    }

    const snapshot = await query.get();
    let spots = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Spot[];

    // Filter amenities client-side since Firestore doesn't support
    // complex queries on nested fields
    if (filters.amenities) {
      spots = spots.filter(spot => {
        return Object.entries(filters.amenities!).every(
          ([key, value]) => spot.amenities[key as keyof Spot['amenities']] === value
        );
      });
    }

    return spots;
  }

  // Get spots by owner
  async getSpotsByOwner(ownerId: string) {
    const snapshot = await firestore()
      .collection(this.collection)
      .where('ownerId', '==', ownerId)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Spot[];
  }

  // Update spot rating
  async updateSpotRating(spotId: string, newRating: number) {
    const spot = await this.getById(spotId);
    if (!spot) return;

    const totalReviews = spot.reviews.length;
    const newAverageRating = ((spot.rating * totalReviews) + newRating) / (totalReviews + 1);

    await this.update(spotId, { rating: newAverageRating });
  }

  // Helper function to calculate distance between two points
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

export const spotService = new SpotService(); 