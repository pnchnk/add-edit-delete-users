import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          {/* <Route path=":id" element={<ProductPage />} /> */}
        </Route>
      </Routes>
  );
}

export default App;
