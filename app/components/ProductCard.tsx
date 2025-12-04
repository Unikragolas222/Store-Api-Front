
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../interfaces/Product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col h-full hover:shadow-lg transition-shadow bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
        <Link href={`/product/${product.id}`} className="flex flex-col items-center flex-grow w-full text-center">
            <div className="w-full h-48 flex items-center justify-center mb-4">
            <Image src={product.image} alt={product.title} width={120} height={120} className="object-contain" />
            </div>
            <h2 className="text-lg font-bold h-20 overflow-hidden text-black dark:text-white">{product.title}</h2>
            <p className="text-gray-500 dark:text-gray-300 text-2xl font-bold my-4">${product.price}</p>
        </Link>
        <div className="mt-auto w-full">
            <button onClick={handleAddToCart} className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors z-10">
                Añadir al carrito
            </button>
        </div>
    </div>
  );
};

export default ProductCard;
