import React, { createContext, useState, useContext, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Écoute des changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Récupérer les données supplémentaires de l'utilisateur depuis Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || userData?.displayName || "",
          photoURL: user.photoURL || userData?.photoURL || "",
          ...userData
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    // Nettoyage
    return () => unsubscribe();
  }, []);

  // Inscription avec email, mot de passe et pseudo
  const signup = async (email, password, displayName) => {
    setError("");
    try {
      // Création de l'utilisateur avec Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Mise à jour du profil avec le pseudo
      await updateProfile(user, { displayName });

      // Création du document utilisateur dans Firestore
      const userDoc = {
        uid: user.uid,
        email: user.email,
        displayName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, "users", user.uid), userDoc);

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName,
      });

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Connexion avec email et mot de passe
  const login = async (email, password) => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Mise à jour du profil utilisateur
  const updateUserProfile = async (updates) => {
    if (!currentUser) return { success: false, error: "Utilisateur non connecté" };
    
    try {
      // Mise à jour dans Firebase Auth
      if (updates.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: updates.displayName
        });
      }

      // Mise à jour dans Firestore
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        { ...updates, updatedAt: serverTimestamp() },
        { merge: true }
      );

      // Mise à jour de l'état local
      setCurrentUser(prev => ({
        ...prev,
        ...updates
      }));

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateUserProfile,
    error,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
