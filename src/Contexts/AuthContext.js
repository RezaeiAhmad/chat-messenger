import React, { useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../components/Firebase";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if(user) history.push("/chats");
    });
  }, [user, history]);
  return (
    <authContext.Provider value={user}>
      {!loading && children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
