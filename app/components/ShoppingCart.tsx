
'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleClearCart = () => {
    clearCart();
  };

  return (
    // Main container
    <div
      className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-zinc-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
      
      {/* Header */}
      <div className="flex-shrink-0 p-4 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold text-black dark:text-white">Carrito de compra</h2>
        <button onClick={onClose} className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white p-2 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-grow overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <p className="text-lg font-medium text-zinc-600 dark:text-zinc-300 mt-4">El carrito esta vacio.</p>
            <p className='text-sm text-zinc-400 dark:text-zinc-500 mt-1'>Los productos que añadas al carrito apareceran aqui.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800 -m-4 p-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center py-4 first:pt-0 last:pb-0">
                <Image src={item.image} alt={item.title} width={64} height={64} className="object-contain p-1 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white" />
                <div className="flex-grow ml-4">
                  <p className="font-semibold text-sm text-black dark:text-white leading-tight">{item.title}</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">{item.quantity} x ${item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-4 p-1 text-xs font-medium transition-colors">Eliminar</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="flex-shrink-0 p-4 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
            <div className="flex justify-between items-center font-bold text-lg mb-4 text-black dark:text-white">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <button onClick={handleClearCart} className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
              Limpiar el carrito.
            </button>
        </div>
      )}
    </div>
  );
}
