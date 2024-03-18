// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { /* connectFirestoreEmulator, */ getFirestore } from 'firebase/firestore';
// import { /* connectStorageEmulator, */ getStorage } from 'firebase/storage';
// import { isDev } from '../isDev';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB5jMP65p05bT0VrBYfXO65_HnnHBN-igM',
    authDomain: 'miniext-lim1017.firebaseapp.com',
    projectId: 'miniext-lim1017',
    storageBucket: 'miniext-lim1017.appspot.com',
    messagingSenderId: '720306543308',
    appId: '1:720306543308:web:66192214421a353a0dc069',
    measurementId: 'G-NHK9YQCJDC',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
export const baseBucketName = 'miniext-lim1017.appspot.com';

/* if (isDev) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8081);
} */
