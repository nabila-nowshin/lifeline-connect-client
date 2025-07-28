import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //signin with google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        toast.success(`Welcome, ${result.user.displayName || "User"}!`);
        return result.user;
      })
      .catch((error) => {
        // console.error(error);
        toast.error("Google Sign-In failed.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email) {
        localStorage.setItem("access-token", currentUser.accessToken);
      } else {
        localStorage.removeItem("access-token");
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup
  }, []);

  const signOutUser = () => {
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    updateUserProfile,
    resetPassword,
    loading,
    setLoading,
    user,
    setUser,
  };

  // if (user?.accessToken) {
  //   localStorage.setItem("access-token", user.accessToken);
  // } else {
  //   localStorage.removeItem("access-token");
  // }
  // console.log(user.accessToken);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
