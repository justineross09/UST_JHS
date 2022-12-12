import { initializeApp, getApps } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from '@firebase/storage';

//Production
// let url = window.location.href;
// let url = "https://matcha-jobs.com/";
// url = url.split("/");

// console.log(url);
// console.log(url[2].split(".")[0]);

//production
const firebaseConfig = {
  apiKey: 'AIzaSyAbvQh9AfMZ7kPLQVBQqm_U8NwBBNT_vsk',
  authDomain: 'sample-5ae31.firebaseapp.com',
  projectId: 'sample-5ae31',
  storageBucket: 'sample-5ae31.appspot.com',
  messagingSenderId: '639326922226',
  appId: '1:639326922226:web:8de505e0e295faba6bb76b',
  measurementId: 'G-HSWJW3PSRH',
};

//Staging
// const firebaseConfig = {
//   apiKey: "AIzaSyASiTmg0WRI0yYSYdIcjsZd_DGc9PaZAJw",
//   authDomain: "sample-bfce0.firebaseapp.com",
//   projectId: "sample-bfce0",
//   storageBucket: "sample-bfce0.appspot.com",
//   messagingSenderId: "652920267611",
//   appId: "1:652920267611:web:12738eaba635eca814f07e",
//   measurementId: "G-PCYCS01GMZ"
// };

// matcha-6262b.firebaseapp.com

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps();

export const storage = getStorage();

