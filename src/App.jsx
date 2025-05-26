import "./firebaseTest";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Header from "./components/atoms/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
