import React, { useState } from "react";
import { getUserByEmail, createUser } from "../api/api";

const AuthPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        // Signup flow
        const user = await createUser({ name, email, password });
        onLoginSuccess(user);
      } else {
        // Login flow
        const user = await getUserByEmail(email);
        if (!user) {
          setError("User not found, please sign up.");
          return;
        }
        if (user.password !== password) {
          setError("Incorrect password");
          return;
        }
        onLoginSuccess(user);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>

      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Login" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
