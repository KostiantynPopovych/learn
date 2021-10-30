import {initializeApp} from 'firebase/app';
import {collection, getFirestore} from 'firebase/firestore';
import {Db} from "constants/db";

const firebaseConfig = {
  apiKey: 'AIzaSyD1R3D79WoFOBpluaThHEhVBea6F1U1kGY',
  authDomain: 'learn-2014c.firebaseapp.com',
  projectId: 'learn-2014c',
  storageBucket: 'learn-2014c.appspot.com',
  messagingSenderId: '390057819549',
  appId: '1:390057819549:web:ead6207bff1340a1768374',
};

const firebaseInstance = initializeApp(firebaseConfig);

const db = getFirestore();

// TODO: MOVE TO CONTEXT
const sectionsCollection = collection(db, Db.Sections);

const topicsCollection = collection(db, Db.Topics);

export { firebaseInstance, db, sectionsCollection, topicsCollection };
