// Remove the import for Timestamp
// import { Timestamp } from '@react-native-firebase/firestore';

// Base interface for all documents
export interface BaseDocument {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Spot (Study Location) schema
export interface Spot extends BaseDocument {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  type: 'coworking' | 'cafe' | 'library';
  amenities: {
    wifi: boolean;
    powerOutlets: boolean;
    quiet: boolean;
    food: boolean;
    coffee: boolean;
    parking: boolean;
    wheelchairAccessible: boolean;
    hours24: boolean;
  };
  operatingHours: {
    [key: string]: { // 'monday', 'tuesday', etc.
      open: string; // "09:00"
      close: string; // "17:00"
      isOpen: boolean;
    };
  };
  photos: string[]; // URLs to photos
  rating: number;
  reviews: Review[];
  noiseLevel: 'quiet' | 'moderate' | 'loud';
  capacity: number;
  priceRange: '$' | '$$' | '$$$';
  ownerId: string; // Reference to User who added/owns the spot
  isVerified: boolean;
}

// Review schema
export interface Review extends BaseDocument {
  spotId: string;
  userId: string;
  rating: number;
  comment: string;
  photos?: string[];
  likes: number;
  helpful: number;
  tags: string[]; // e.g., ['quiet', 'good wifi', 'crowded']
}

// User schema
export interface User extends BaseDocument {
  email: string;
  displayName: string;
  photoURL?: string;
  preferences: {
    preferredNoiseLevel: 'quiet' | 'moderate' | 'lively';
    preferredPriceRange: ('$' | '$$' | '$$$')[];
    favoriteAmenities: string[];
    homeLocation?: {
      latitude: number;
      longitude: number;
    };
  };
  savedSpots: string[]; // Array of spot IDs
  reviews: string[]; // Array of review IDs
  role: 'user' | 'admin' | 'owner';
}

// Collection names as constants
export const COLLECTIONS = {
  SPOTS: 'spots',
  REVIEWS: 'reviews',
  USERS: 'users',
} as const;

// Type for collection names
export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];

// Helper type for creating new documents
export type CreateDocument<T extends BaseDocument> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

// Helper type for updating documents
export type UpdateDocument<T extends BaseDocument> = Partial<Omit<T, 'id' | 'createdAt'>> & { id: string }; 