// Test simple de la connexion Firebase
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
  try {
    // Récup une collection "test"
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    
    // Si on arrive ici, c'est que ça marche
    console.log('Connexion Firebase réussie! 🎉');
    
    return {
      success: true,
      data: {
        collectionName: 'test',
        documentsCount: snapshot.size,
        connectionTime: new Date().toLocaleTimeString()
      }
    };
  } catch (error) {
    console.error('Erreur de connexion Firebase:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Et enfin on éxécute le code directement
testFirebaseConnection().then(result => {
  if (result.success) {
    console.log('Test réussi avec ce résultat:', result.data);
  } else {
    console.log('Échec du test:', result.error);
  }
});
