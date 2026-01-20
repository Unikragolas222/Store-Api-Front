import ProductCard from './components/ProductCard';
import { Product } from './interfaces/Product';

async function getProducts(): Promise<{ products: Product[], total: number }> {
  // 1. Definimos las credenciales (deberían venir de .env)
  const supabaseUrl = 'https://vpouamwzanbrzqgvqbty.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 

  try {
    // 2. Apuntamos a la tabla de tu base de datos (ej: 'products')
    // Supabase usa REST a través de PostgREST en la ruta /rest/v1/
    const res = await fetch(`${supabaseUrl}/rest/v1/products?select=*`, {
      headers: {
        'apikey': supabaseKey || '',
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!res.ok) {
      throw new Error(`Error Supabase: ${res.statusText}`);
    }

    const products: Product[] = await res.json();
    return { products, total: products.length };

  } catch (error) {
    console.error('Error fetching from Supabase:', error);
    return { products: [], total: 0 };
  }
}