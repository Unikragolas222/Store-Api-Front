import ProductCard from './components/ProductCard';
import { Product } from './interfaces/Product';

export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products');
  return res.json();
}

export default async function Home() {
  const allProducts: Product[] = await getProducts();

  return (
    <div className="bg-white dark:bg-black">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-black dark:text-zinc-50">
          TiendaFake
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
