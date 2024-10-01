import React from "react";
import { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("https://todo-backend-uufz.onrender.com/api/user/register/", {
        email,
        username,
        password,
      });

      navigate("/login");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }

    console.log(email, username, password, cpassword);
  };
  return (
    <>
      <div className="container">
        <h3 className="text-center">Sign Up</h3>
        <form className="shadow rounded mt-2 px-5 py-4" onSubmit={handleSignup}>
          <div className="form-group mt-2">
            <label> Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mt-2">
            <label> Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label> Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label> Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
          </div>

          <div className="checkbox mt-2">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-success mt-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
