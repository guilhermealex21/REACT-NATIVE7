import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8HayUhjEF72jpirSTA5jRYJdyU-hOBW4",
  authDomain: "crud-react-native-168d4.firebaseapp.com",
  databaseURL: "https://projeto-crudreactnative-default-rtdb.firebaseio.com",
  projectId: "crud-react-native-168d4",
  storageBucket: "crud-react-native-168d4.firebasestorage.app",
  messagingSenderId: "89323872259",
  appId: "1:89323872259:web:16d44f54e9c58f96c6ae36",
  measurementId: "G-05CR9VR9L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);