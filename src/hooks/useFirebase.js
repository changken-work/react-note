import { useState } from 'react';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';

const useFirebase = () => {
  const [db, setDB] = useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
    setDB(oldState => firebase.firestore());
  }

  return db;
};

export default useFirebase;
