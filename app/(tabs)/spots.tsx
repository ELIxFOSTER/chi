import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Spot } from '../../types/firestore';

export default function SpotsScreen() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const snapshot = await firestore().collection('spots').get();
        const spotsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Spot));
        setSpots(spotsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load spots. Please try again.');
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Spots</Text>
      <FlatList
        data={spots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.spotItem}>
            <Text style={styles.spotName}>{item.name}</Text>
            <Text style={styles.spotDescription}>{item.description}</Text>
            <Text style={styles.spotAddress}>{item.address.street}, {item.address.city}, {item.address.state} {item.address.zipCode}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  spotItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  spotName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  spotDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  spotAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
}); 