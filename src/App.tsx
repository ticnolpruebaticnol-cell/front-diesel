import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Servicios from './pages/Servicios';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/servicios" element={<Servicios />} />
    </Routes>
  );
};

export default App;
