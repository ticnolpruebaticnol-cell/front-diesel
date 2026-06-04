import React from 'react';

const UserPurchases: React.FC = () => {
  // Aquí puedes obtener y mostrar las compras del usuario
  // Por ahora es solo un placeholder
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4">Mis Compras</h2>
        <p>Aquí aparecerán las compras del usuario.</p>
      </div>
    </div>
  );
};

export default UserPurchases;
