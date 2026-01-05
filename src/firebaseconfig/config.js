import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4EjNhUp_PaxjT5irmgWq2qFrKq-kRUKc",
  authDomain: "atlasify-e6c72.firebaseapp.com",
  projectId: "atlasify-e6c72",
  storageBucket: "atlasify-e6c72.appspot.com",
  messagingSenderId: "851442815144",
  appId: "1:851442815144:web:3d8d5d1c4b8b0f0eaf729d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
export const db = getFirestore(app);

// EMAIL SIGNUP
export const signup = async (name, email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    provider: "email",
    createdAt: new Date(),
  });
};

// EMAIL LOGIN
export const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// LOGOUT
export const logout = async () => {
  await signOut(auth);
};
