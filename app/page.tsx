import ProductCard from './components/ProductCard';
import { Product } from './interfaces/Product';

async function getProducts(): Promise<{ products: Product[], total: number }> {
  try {
    const res = await fetch(`https://vpouamwzanbrzqgvqbty.supabase.co`);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error: ${res.status} ${res.statusText}`, errorText);
      throw new Error('Failed to fetch products');
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const products = await res.json();
      return { products: products, total: products.length };
    } else {
      const textResponse = await res.text();
      console.error("Received non-JSON response:", textResponse);
      throw new Error('Received non-JSON response from API');
    }
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
        <h1 className="text-2xl font-bold mb-4">Error al cargar los productos</h1>
        <p>Error al cargar los productos. Intentalo de nuevo más tarde.</p>
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
