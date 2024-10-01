import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Landingpage from "./components/Landingpage";
import Navbar from "./components/NavigationBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Protected from "./components/Protected";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import { ACCESS_TOKEN } from "./constants";
import { jwtDecode } from "jwt-decode";

import Today from "./components/Today";
import Upcoming from "./components/Upcoming";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
          setIsLoggedIn(false);
          localStorage.removeItem(ACCESS_TOKEN);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route
            path="login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="logout" element={<Navigate to="/" />} />
          <Route
            path="signup"
            element={<Signup setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route
            path="todos/today"
            element={
              <Protected>{<Today setIsLoggedIn={setIsLoggedIn} />}</Protected>
            }
          />
          <Route
            path="todos/upcoming"
            element={
              <Protected>
                {<Upcoming setIsLoggedIn={setIsLoggedIn} />}
              </Protected>
            }
          />

          <Route path="todos" element={<Protected>{<Home />}</Protected>} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
