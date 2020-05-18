import * as firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBe7_UZdPMrUEPVHY_ngJKgAV1CFNMpMkk',
  authDomain: 'lookup-7c92b.firebaseapp.com',
  databaseURL: 'https://lookup-7c92b.firebaseio.com',
  projectId: 'lookup-7c92b',
  storageBucket: 'lookup-7c92b.appspot.com',
  messagingSenderId: '898767288753',
  appId: '1:898767288753:web:083ba208beda7c502aa590',
});

export default app;
