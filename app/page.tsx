
import ProductCard from './components/ProductCard';
import { Product } from './interfaces/Product';

export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  // This fetch is wrapped in a try...catch to handle network errors gracefully.
  try {
    const res = await fetch('https://fakestoreapi.com/products');

    // Check if the response is ok (status in the range 200-299)
    if (!res.ok) {
      // Log the error for debugging purposes on the server
      console.error(`Error fetching products: ${res.status} ${res.statusText}`);
      // Return an empty array to prevent the page from crashing
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // This will catch network errors (e.g., DNS resolution, TCP connection)
    console.error("Failed to connect to the products API.", error);
    // Return an empty array to ensure the page can still render.
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
