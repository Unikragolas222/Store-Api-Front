
import ProductCard from './components/ProductCard';
import { Product } from './interfaces/Product';
import { supabase } from './utils/supabase/client';

async function getProducts(): Promise<{ products: Product[], total: number }> {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }

    return { products: products || [], total: products?.length || 0 };
  } catch (error) {
    console.error('Error in getProducts:', error);
    return { products: [], total: 0 };
  }
}

export default async function HomePage() {
  const { products } = await getProducts();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">No se encontraron productos</h1>
        <p>Intentalo de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
