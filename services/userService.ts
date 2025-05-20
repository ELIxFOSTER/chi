import firestore from '@react-native-firebase/firestore';
import { BaseAPI } from './api.ts';
import { User, COLLECTIONS } from '../types/firestore.ts';

class UserService extends BaseAPI<User> {
  constructor() {
    super(COLLECTIONS.USERS);
  }

  // Add user-specific methods
  async getByEmail(email: string) {
    const snapshot = await firestore()
      .collection(this.collection)
      .where('email', '==', email)
      .get();
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as User;
  }

  async updateSettings(userId: string, settings: User['settings']) {
    return this.update(userId, { settings });
  }
}

export const userService = new UserService(); 