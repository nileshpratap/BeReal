import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import Profilepage from "./pages/profilePage";
import Post from "./pages/post";
import { useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Navbar from "./pages/navbar";
import { Login } from "@mui/icons-material";
import PeopleListWidget from "./pages/widgets/PeopleListWidget";
import dotenv from "dotenv";

function App() {
  dotenv.config();

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  console.log("hi");
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/showlist" element={<PeopleListWidget />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile/:userId" element={<Profilepage />} />
              <Route path="/posts/:postId" element={<Post />} />
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
