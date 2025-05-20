import "./Loginform.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubmarineImage from "../Graphics/submarine.png";
import AnchorIcon from "../Graphics/anchor.png";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && password) {
      setMessage(`🔐 Logging in as ${username}...`);

      try {
        const response = await fetch("http://192.168.0.214:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data = await response.json();
        console.log(data);
        if (data.success) {
          setMessage("🔐 Login successfull!");
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage("⚠️ An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("⚠️ Please enter both username and password.");
    }
  };

  return (
    <div className="form-container">
      <div className="ring large"></div>
      <div className="ring medium"></div>
      <div className="ring small"></div>
      <div className="panel-top">
        <div className="left-panel">
          <div className="panel-glow"></div>
          <h1 className="company-name">ARI Simulation</h1>
          <p className="tagline-subtitle">Innovate. Simulate. Accelerate.</p>
          <div className="tagline">
            <p className="tagline-item">
              Empowering industries with cutting-edge simulations.
            </p>
            <p className="tagline-item">
              Trusted in marine, defense, and energy sectors.
            </p>
            <p className="tagline-item">
              75+ simulator types tailored for global needs.
            </p>
          </div>
          <div className="panel-divider"></div>
        </div>
        <div className="right-panel">
          <div className="form-card animate-slide-up">
            <h1 className="form-title">Login</h1>
            <form onSubmit={handleSubmit} className="form-body">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
              <p className="password-footer">
                <Link to="/register" className="password-link">
                  Forgot password?
                </Link>
              </p>
              <button
                type="submit"
                className="form-button bg-sky-500"
                disabled={loading}
              >
                Login
              </button>
            </form>
            {message && <p className="form-message">{message}</p>}
            <p className="form-footer">
              Don’t have an account?{" "}
              <Link to="/register" className="form-link">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="bubble-container">
        {[...Array(25)].map((_, i) => {
          const size = 5 + Math.random() * 10;
          return (
            <div
              key={i}
              className="bubble"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
                width: `${size}px`,
                height: `${size}px`,
              }}
            />
          );
        })}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 opacity-70">
        <img
          src={AnchorIcon}
          alt="Anchor"
          className="w-full h-full animate-bounce-slow"
        />
      </div>
      <div className="submarine-container">
        <img src={SubmarineImage} alt="Submarine" className="submarine-image" />
      </div>
      <div className="submarine-container-reverse">
        <img src={SubmarineImage} alt="Submarine" className="submarine-image" />
      </div>
    </div>
  );
}

export default LoginForm;
