import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
// import {jwt_decode} from jwt_decode
import { jwtDecode } from "jwt-decode";

import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Protected({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    //catch incase of any error
    auth().catch(() => setIsAuthorized(false));
  }, []);

  //function to refresh the access token
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      //we send request to backend with the refresh token to get a new access token
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      //if response is succesful
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  //function to check if we have to refresh access token or we proceed
  const auth = async () => {
    //get the access token in the localstorage, if there is one, then check if its expired or not
    const token = localStorage.getItem(ACCESS_TOKEN);

    //no token in storage
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    //if token is available, decode it
    const decoded = jwtDecode(token);
    //get expiration
    const tokenExpiration = decoded.exp;
    //get today in seconds not in millseconds
    const now = Date.now() / 1000;

    //check token expiration
    //expired?
    if (tokenExpiration < now) {
      await refreshToken();
    }
    //not expired
    else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading....</div>;
  }

  return isAuthorized ? children : <Navigate to="/" />;
}

export default Protected;
