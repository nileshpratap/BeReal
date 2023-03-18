import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import Profilepage from "./pages/profilePage";
import { useState } from "react";

function App() {
  const mode = useState;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:useId" element={<Profilepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
