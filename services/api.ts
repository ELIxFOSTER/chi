import firestore from '@react-native-firebase/firestore';
import { BaseDocument, CollectionName } from '../types/firestore.ts';
import { COLLECTIONS } from '../types/firestore.ts';

// Base API class for common operations
export class BaseAPI<T extends BaseDocument> {
  protected collection: CollectionName;

  constructor(collection: CollectionName) {
    this.collection = collection;
  }

  // Get all documents
  async getAll() {
    const snapshot = await firestore()
      .collection(this.collection)
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  }

  // Get document by ID
  async getById(id: string) {
    const doc = await firestore()
      .collection(this.collection)
      .doc(id)
      .get();
    
    if (!doc.exists) return null;
    
    return {
      id: doc.id,
      ...doc.data()
    } as T;
  }

  // Create document
  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) {
    const docRef = firestore()
      .collection(this.collection)
      .doc();
    
    const newDoc = {
      ...data,
      id: docRef.id,
      createdAt: firestore.Timestamp.now(),
    };
    
    await docRef.set(newDoc);
    return newDoc as T;
  }

  // Update document
  async update(id: string, data: Partial<Omit<T, 'id' | 'createdAt'>>) {
    await firestore()
      .collection(this.collection)
      .doc(id)
      .update({
        ...data,
        updatedAt: firestore.Timestamp.now(),
      });
  }

  // Delete document
  async delete(id: string) {
    await firestore()
      .collection(this.collection)
      .doc(id)
      .delete();
  }

  // Subscribe to collection changes
  subscribe(callback: (data: T[]) => void) {
    return firestore()
      .collection(this.collection)
      .onSnapshot(snapshot => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];
        callback(items);
      });
  }
} 