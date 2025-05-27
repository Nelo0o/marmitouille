import Home from "@pages/Home";
import Login from "@pages/Login/Login";
import Register from "@pages/Register/Register";
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
      </Routes>
    </>
  );
}

export default App;
