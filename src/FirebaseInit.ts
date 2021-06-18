import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyA0QwzJ1I_i4w-jO-9Vk1W5YKHFAyVSal4',
    authDomain: 'cloud-lightning-lite.firebaseapp.com',
    projectId: 'cloud-lightning-lite',
    storageBucket: 'cloud-lightning-lite.appspot.com',
    messagingSenderId: '607208296062',
    appId: '1:607208296062:web:17cfe68400f2a65ddcd22f',
    measurementId: 'G-R55E0ZP42N',
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    //firebase.analytics();
}
