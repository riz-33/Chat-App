import AppRouter from './config/router';
import './App.css';
import User from './context/user';
import { Provider } from 'react-redux';
import { useState } from 'react';
import { auth, getDoc, onAuthStateChanged, db, doc } from './config/firebase';
import { useEffect } from 'react';


function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    })
  }, []);

  return (
    <User.Provider value={{ user }}>
      <AppRouter />
    </User.Provider>
  );
}

export default App;
