import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Navigate to="login" replace />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/users/:id/home/content" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
