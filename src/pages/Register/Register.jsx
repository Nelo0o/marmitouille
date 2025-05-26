import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEST INSCPRITION
    const testToken = "user_token_123";
    const newUser = {
      username: form.username,
      email: form.email,
    };

    login(newUser, testToken);

    navigate("/");
  };

  return (
    <div>
      <h2>Inscritpion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Adresse email :</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
}
