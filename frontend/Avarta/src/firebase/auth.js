import {auth} from './firebaseConfig';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    GoogleAuthProvider 
  } from 'firebase/auth';

// Fix the typo in the parameter
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Add missing import and make async
export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Add missing import and make async
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
    return auth.signOut();
};

/* export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordUpdate = (password) => {
    return currentUser.updatePassword(password);
};

export const doSendEmailVerification = () => {
    return currentUser.sendEmailVerification({
        url: `${window.location.origin}/login`,
    });
}; */