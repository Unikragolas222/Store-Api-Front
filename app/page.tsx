
import ProductCard from './components/ProductCard';
import { Product } from './interfaces/Product';

export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  try {
    // The { cache: 'no-store' } option is crucial for Vercel deployments.
    // It prevents caching of the fetch response, ensuring fresh data on every request.
    const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });

    if (!res.ok) {
      // If the response is not OK, read the response as text to see what was actually returned.
      const errorText = await res.text();
      console.error(`Error fetching products: ${res.status} ${res.statusText}`, errorText);
      return [];
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return res.json();
    } else {
      // If the content type is not JSON, it's an error.
      const responseText = await res.text();
      console.error("Expected JSON but received different content type:", contentType, responseText);
      return [];
    }

  } catch (error) {
    console.error("Failed to connect to the products API.", error);
    return [];
  }
}

export default async function Home() {
  const allProducts: Product[] = await getProducts();

  return (
    <div className="bg-white dark:bg-black">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-black dark:text-zinc-50">
          TiendaFake
        </h1>
        {allProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-black dark:text-zinc-50 py-10">
            <p className="text-lg">Could not load products at this time.</p>
            <p>Please try again later.</p>
          </div>
        )}
      </main>
    </div>
  );
}
