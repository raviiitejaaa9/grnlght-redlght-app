import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";

import Registration from './components/Registration'; 
import GreenLightRedLight from './components/GreenLightRedLight';
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/game" element={<ProtectedRoute element={<GreenLightRedLight />} />} />  
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
