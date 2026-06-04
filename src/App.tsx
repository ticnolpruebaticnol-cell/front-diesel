import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Servicios from './pages/Servicios';
import Compras from './pages/Compras';
import PagoResultado from './pages/PagoResultado';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/compras" element={<Compras />} />
      <Route path="/pago/resultado" element={<PagoResultado />} />
    </Routes>
  );
};

export default App;
