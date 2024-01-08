import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
const swal = require('sweetalert2');

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);

  const loginUser = async (username, password, onSuccess) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      onSuccess();
      swal.fire({
        title: "Login Successful",
        icon: "success",
        toast: true,
        timer: 4001,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      console.log("Login failed:", response.status);
      swal.fire({
        title: "Error While Logging In",
        html: "Incorrect Username or Password",
        icon: "error",
        toast: true,
        timer: 5001,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const registerUser = async (username, first_name, last_name, email, password, password2, onSuccess) => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, first_name, last_name, email, password, password2
      }),
    });

    if (response.ok) {
      onSuccess();
      swal.fire({
        title: "Registration Successful, Login Now",
        icon: "success",
        toast: true,
        timer: 4001,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      })
    } else {
      console.log("Registration failed:", response.status);
      swal.fire({
        title: "An Error Occurred While Registering",
        html: "Possible Causes:<br>- That username already exists<br>- Server Error",
        icon: "error",
        toast: true,
        timer: 5001,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");

    swal.fire({
      title: "You have been logged out...",
      icon: "success",
      toast: true,
      timer: 4001,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
    });

    // Navigate to login using navigate function
    navigate("/login");
  };

  const isAuthenticated = () => {
    return !!authTokens;
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
    isAuthenticated,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
