// Register.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Registrar usuario
      await axios.post("http://localhost:8000/register/", formData);

      // 2. Hacer login automático
      const loginRes = await axios.post(
        "http://localhost:8000/api-token-auth/",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      // 3. Guardar en contexto
      dispatch({
        type: "LOGIN",
        payload: {
          user: { username: formData.username },
          token: loginRes.data.token,
        },
      });

      // Guardar en localStorage
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ username: formData.username })
      );

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.username?.[0] || "Error en el registro");
      console.error("Register error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Registro</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>
        <button type="submit" className="login-button">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
