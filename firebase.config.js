import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyDv-osUbMEFDLkYpkIwjNBF8TCQBh4MNg8",
    authDomain: "students-freelancing-platform.firebaseapp.com",
    projectId: "students-freelancing-platform",
    storageBucket: "students-freelancing-platform.appspot.com",
    messagingSenderId: "733782760430",
    appId: "1:733782760430:web:ff2496eb9791c55ce14cff",
    measurementId: "G-4C4J69F6WV"
};

const app = initializeApp(firebaseConfig);
export { app };