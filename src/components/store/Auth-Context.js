import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const userLoggedIn = !!token;
  let logoutTimer;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);

    // Set a timer for 5 minutes (300,000 milliseconds)
    logoutTimer = setTimeout(logoutHandler, 60000);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    if (logoutTimer) {
      clearTimeout(logoutTimer); // Clear the timer
    }
  };

  useEffect(() => {
    // Check if the user is logged in and set a timer
    if (userLoggedIn) {
      // Set a timer for 5 minutes (300,000 milliseconds)
      logoutTimer = setTimeout(logoutHandler, 60000);
    } else {
      // Clear the timer if the user is not logged in
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    }

    // Add event listeners or other mechanisms to reset the timer on user activity
    const resetTimerOnActivity = () => {
      if (userLoggedIn && logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(logoutHandler, 60000); // Reset the timer
      }
    };

    // Attach event listeners to reset the timer (e.g., on user interactions)
    window.addEventListener("mousemove", resetTimerOnActivity);
    window.addEventListener("keydown", resetTimerOnActivity);

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener("mousemove", resetTimerOnActivity);
      window.removeEventListener("keydown", resetTimerOnActivity);
    };
  }, [userLoggedIn]);

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
