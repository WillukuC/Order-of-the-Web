import React from "react";
import { NavBar } from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginSignup from "./components/LoginSignup/LoginSignup";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginSignup />}/>
        <Route path="/" element={<HomePage />}/>
      </Routes>
    </div>
  );
}

export default App;