import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, displayName } = e.target.elements;
    const result = await signup(email.value, password.value, displayName.value);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="displayName" placeholder="Display Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
