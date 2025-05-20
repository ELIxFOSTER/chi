import { useState, useEffect } from 'react';
import { User } from '../types/firestore';
import { userService } from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = userService.subscribe((updatedUsers) => {
      setUsers(updatedUsers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      return await userService.create(userData);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateUser = async (id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>) => {
    try {
      await userService.update(id, data);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await userService.delete(id);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };
}; 