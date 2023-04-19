import React from "react";
import { Routes, Route } from "react-router-dom";

import HelloPage from "./pages/HelloPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HelloPage />} />
      </Route>
      <Route path="/users/">
        <Route index element={<HomePage />} />
        <Route path=":id" element={<UserPage />} />
      </Route>
    </Routes>
  );
}

export default App;
