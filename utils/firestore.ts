import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {
  BaseDocument,
  CollectionName,
  CreateDocument,
  UpdateDocument,
  COLLECTIONS,
} from '../types/firestore';

// Generic function to get a collection reference
export const getCollection = <T extends BaseDocument>(collectionName: CollectionName) => {
  return firestore().collection(collectionName) as FirebaseFirestoreTypes.CollectionReference<T>;
};

// Generic function to get a document reference
export const getDocument = <T extends BaseDocument>(
  collectionName: CollectionName,
  documentId: string
) => {
  return firestore().collection(collectionName).doc(documentId) as FirebaseFirestoreTypes.DocumentReference<T>;
};

// Create a new document
export const createDocument = async <T extends BaseDocument>(
  collectionName: CollectionName,
  data: CreateDocument<T>
): Promise<T> => {
  const docRef = getCollection<T>(collectionName).doc();
  const newDoc: T = {
    ...data,
    id: docRef.id,
    createdAt: firestore.Timestamp.now(),
  } as T;

  await docRef.set(newDoc);
  return newDoc;
};

// Update a document
export const updateDocument = async <T extends BaseDocument>(
  collectionName: CollectionName,
  data: UpdateDocument<T>
): Promise<void> => {
  const { id, ...updateData } = data;
  const docRef = getDocument<T>(collectionName, id);
  
  await docRef.update({
    ...updateData,
    updatedAt: firestore.Timestamp.now(),
  });
};

// Delete a document
export const deleteDocument = async (
  collectionName: CollectionName,
  documentId: string
): Promise<void> => {
  const docRef = getDocument(collectionName, documentId);
  await docRef.delete();
};

// Get a document by ID
export const getDocumentById = async <T extends BaseDocument>(
  collectionName: CollectionName,
  documentId: string
): Promise<T | null> => {
  const docRef = getDocument<T>(collectionName, documentId);
  const doc = await docRef.get();
  
  if (!doc.exists) {
    return null;
  }
  
  return doc.data() as T;
};

// Get all documents in a collection
export const getAllDocuments = async <T extends BaseDocument>(
  collectionName: CollectionName
): Promise<T[]> => {
  const snapshot = await getCollection<T>(collectionName).get();
  return snapshot.docs.map((doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<T>) => doc.data());
};

// Subscribe to a document
export const subscribeToDocument = <T extends BaseDocument>(
  collectionName: CollectionName,
  documentId: string,
  callback: (data: T | null) => void
) => {
  const docRef = getDocument<T>(collectionName, documentId);
  return docRef.onSnapshot((doc: FirebaseFirestoreTypes.DocumentSnapshot<T>) => {
    callback(doc.exists ? doc.data() : null);
  });
};

// Subscribe to a collection
export const subscribeToCollection = <T extends BaseDocument>(
  collectionName: CollectionName,
  callback: (data: T[]) => void
) => {
  const collectionRef = getCollection<T>(collectionName);
  return collectionRef.onSnapshot((snapshot: FirebaseFirestoreTypes.QuerySnapshot<T>) => {
    const documents = snapshot.docs.map((doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<T>) => doc.data());
    callback(documents);
  });
}; 