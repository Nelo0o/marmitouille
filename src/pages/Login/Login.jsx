import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const testUser = { username: "Jean-mi", email: "jean@test.com" };
    const testToken = "123456";
    login(testUser, testToken);
    navigate("/");
  };

  return (
    <div>
      <h2>Connexion</h2>
      <button onClick={handleLogin}>Se connecter (test)</button>
    </div>
  );
}
