import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from '../firebase/firebase.config';



const Provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    // *** Create User
    const userRegister = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
    };

    // ***  User Update Info

    const updateUserInfo = (updateInfo) => {
      return updateProfile(auth.currentUser, updateInfo);
    };

    // ***  User LogIn
    const userLogIn = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };

    // ***  User LogIn/ Register With Google
    const userSignInGoogle = () => {
      return signInWithPopup(auth, Provider);
    };

    // ***  User LogOut
    const userLogOut = () => {
      return signOut(auth);
    };

    // ***  AuthState change
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => {
        unsubscribe();
      };
    }, []);

    const authInfo = {
      userRegister,
      user,
      loading,
      setLoading,
      setUser,
      updateUserInfo,
      userLogOut,
      userLogIn,
      userSignInGoogle,
    };
    
    return <AuthContext value={authInfo}>{children}</AuthContext>;
    
};

export default AuthProvider;