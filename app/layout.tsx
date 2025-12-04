
'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider, useCart } from './context/CartContext';
import { useState } from 'react';
import ShoppingCart from './components/ShoppingCart';
import Link from 'next/link'; // Import Link

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// CartIcon component
function CartIcon() {
    const { cartItems } = useCart();
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                </span>
            )}
        </div>
    );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black`}>
        <CartProvider>
          <header className="bg-white dark:bg-black p-4 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-10">
            <Link href="/">
              <h1 className="text-xl font-bold text-black dark:text-white cursor-pointer">TiendaFake</h1>
            </Link>
            <button onClick={toggleCart} aria-label="Open cart">
              <CartIcon />
            </button>
          </header>
          <main>{children}</main>
          <ShoppingCart isOpen={isCartOpen} onClose={toggleCart} />
        </CartProvider>
      </body>
    </html>
  );
}
