// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Création du contexte
const UserContext = createContext();

// Exportation du fournisseur de contexte
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ firstName: '', lastName: '' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useUser = () => useContext(UserContext);
