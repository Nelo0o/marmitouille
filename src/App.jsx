import Home from "@pages/Home";
import Login from "@pages/Login/Login";
import Register from "@pages/Register/Register";
import Profile from "@pages/Profile/Profile";
import MyRecipes from "@pages/MyRecipes/MyRecipes";
import { Routes, Route } from "react-router-dom";
import Header from "@components/atoms/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
      </Routes>
    </>
  );
}

export default App;
