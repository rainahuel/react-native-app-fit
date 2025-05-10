import { Platform } from 'react-native';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

let auth: Auth;
let db: Firestore;

if (Platform.OS === 'web') {
  const webImplementation = require('./web');
  auth = webImplementation.auth;
  db = webImplementation.db;
} else {
  const nativeImplementation = require('./native');
  auth = nativeImplementation.auth;
  db = nativeImplementation.db;
}

export { auth, db };