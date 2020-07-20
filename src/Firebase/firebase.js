import firebaseConfig from './config';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

export default class Firebase {
    constructor() {
      firebase.initializeApp(firebaseConfig);
   
      this.auth = firebase.auth();
      this.database = firebase.database();
      this.user = null;
   
      this.googleProvider = new firebase.auth.GoogleAuthProvider();
    }
   
    // *** Auth API ***
    doSignInWithGoogle = () =>
      this.auth.signInWithPopup(this.googleProvider);
   
    doSignOut = () => this.auth.signOut();

    doSignInAnonymous = () =>
      this.auth.signInAnonymously();
}