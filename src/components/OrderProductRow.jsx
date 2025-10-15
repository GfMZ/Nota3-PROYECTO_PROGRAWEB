import React from 'react';

// Componente para renderizar una fila de producto
export default function OrderProductRow({ id, name, category, quantity, total, imageUrl }) {
  return (
    <tr className=" border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition">
      
      
      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-10 h-10 object-contain mr-3 rounded-md border border-gray-200"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/f3f4f6/374151?text=IMG" }}
        />
        <span className="text-green-600 font-semibold">{id}</span>
      </td>
      
      {/* Nombre */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{name}</td>
      
      {/* Categoría */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{category}</td>
      
      {/* Cantidad */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{quantity}</td>
      
      {/* Total */}
      <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-800">{total}</td>
    </tr>
  );
}
