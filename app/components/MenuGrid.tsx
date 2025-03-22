import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

interface MenuGridProps {
  items: MenuItem[];
  onAddItem: (item: MenuItem) => void;
}

export function MenuGrid({ items, onAddItem }: MenuGridProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.price) {
      onAddItem({
        id: crypto.randomUUID(),
        name: newItem.name,
        price: newItem.price,
        description: newItem.description || '',
      });
      setNewItem({ name: '', price: 0, description: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            {item.image && (
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
            )}
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-red-500 font-bold mt-2">R$ {item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-red-500 text-white rounded-full p-3 shadow-lg hover:bg-red-600 transition-colors"
        aria-label="Adicionar item"
      >
        <FiPlus size={24} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Adicionar Item ao Cardápio</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    rows={3}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}