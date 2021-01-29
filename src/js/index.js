import '../styles.css';

import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebaseui';

const firebaseConfig = {
  apiKey: 'AIzaSyC7TRb9mfyMhzQU-yq3pDKTxl2-zaHwRmo',
  authDomain: 'filmoteka-login.firebaseapp.com',
  databaseURL:
    'https://filmoteka-login-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-login',
  storageBucket: 'filmoteka-login.appspot.com',
  messagingSenderId: '658952655924',
  appId: '1:658952655924:web:26304edc0b944079c1e661',
};

firebase.initializeApp(firebaseConfig);
const myUi = new firebaseui.auth.AuthUI(firebase.auth());

const refs = {
  emailInput: document.querySelector('.email-input'),
  passwordInput: document.querySelector('.password-input'),
  loginBtn: document.querySelector('.login'),
  signupBtn: document.querySelector('.signup'),
  logoutBtn: document.querySelector('.logout'),
  alertNotAUser: document.querySelector('.alert-not-a-user'),
};

// checking if user is already logged in
function loginChecker() {
  const user = localStorage.getItem('firebaseUser');
  if (user) {
    refs.emailInput.classList.add('is-hidden');
    refs.passwordInput.classList.add('is-hidden');
    refs.loginBtn.classList.add('is-hidden');
    refs.signupBtn.classList.add('is-hidden');
    refs.logoutBtn.classList.remove('is-hidden');
  }
}
loginChecker();

// Login Event
refs.loginBtn.addEventListener('click', e => {
  const email = refs.emailInput.value;
  const password = refs.passwordInput.value;
  const auth = firebase.auth();
  const signIn = auth.signInWithEmailAndPassword(email, password);
  signIn
    .then(e => {
      refs.emailInput.classList.add('is-hidden');
      refs.passwordInput.classList.add('is-hidden');
      refs.loginBtn.classList.add('is-hidden');
      refs.signupBtn.classList.add('is-hidden');
      refs.alertNotAUser.classList.add('is-hidden');
      refs.logoutBtn.classList.remove('is-hidden');
    })
    .catch(e => {
      console.log(e.message);
      refs.alertNotAUser.classList.remove('is-hidden');
    });
});

// signup Event
refs.signupBtn.addEventListener('click', e => {
  const email = refs.emailInput.value;
  const password = refs.passwordInput.value;
  const auth = firebase.auth();
  const signIn = auth.createUserWithEmailAndPassword(email, password);
  signIn
    .then(e => {
      refs.emailInput.classList.add('is-hidden');
      refs.passwordInput.classList.add('is-hidden');
      refs.loginBtn.classList.add('is-hidden');
      refs.signupBtn.classList.add('is-hidden');
      refs.alertNotAUser.classList.add('is-hidden');
      refs.logoutBtn.classList.remove('is-hidden');
    })
    .catch(e => {
      console.log(e.message);
    });
});

// logout event
refs.logoutBtn.addEventListener('click', e => {
  firebase
    .auth()
    .signOut()
    .then(e => {
      refs.emailInput.classList.remove('is-hidden');
      refs.passwordInput.classList.remove('is-hidden');
      refs.loginBtn.classList.remove('is-hidden');
      refs.signupBtn.classList.remove('is-hidden');
      refs.logoutBtn.classList.add('is-hidden');
      refs.alertNotAUser.classList.add('is-hidden');
      localStorage.clear();
    });
});

// realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    localStorage.setItem('firebaseUser', JSON.stringify(firebaseUser));
  } else {
    console.log('not logged in');
  }
});
