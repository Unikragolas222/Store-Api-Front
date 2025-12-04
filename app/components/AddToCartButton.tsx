
'use client';

import { useCart } from '../context/CartContext';
import { Product } from '../interfaces/Product';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <button onClick={handleAddToCart} className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors">
      Añadir al carrito
    </button>
  );
}
