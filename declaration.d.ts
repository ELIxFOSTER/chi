// declaration.d.ts
declare module 'firebase/auth/react-native' {
    import {
      Auth,
      AuthProvider,
      initializeAuth as _initializeAuth,
      NextOrObserver,
      User,
      UserCredential,
      AuthError,
      AuthSettings,
      Persistence,
    } from 'firebase/auth';
  
    import { FirebaseApp } from 'firebase/app';
  
    export function getReactNativePersistence(storage: any): Persistence;
    export function initializeAuth(app: FirebaseApp, deps: {
      persistence: Persistence;
    }): Auth;
  }
  