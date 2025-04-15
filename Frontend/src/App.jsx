import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
