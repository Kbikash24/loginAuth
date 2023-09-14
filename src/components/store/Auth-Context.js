import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken=localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);
  const userLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token',token)
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token',token)
  };

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler, // Changed the function name to match your context
    logout: logoutHandler, // Changed the function name to match your context
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
