
import { getProductById } from '../../utils/get-product-by-id';
import { notFound } from 'next/navigation';
import AddToCartButton from '../../components/AddToCartButton';
import { Product } from '../../interfaces/Product';
import Image from 'next/image';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  console.log(`Product detail page received ID: ${params.id}`);
  const { id } = params;
  const product: Product | null = await getProductById(id);

  if (!product) {
    console.error(`Product not found for ID: ${id}. Triggering 404.`);
    notFound();
  }

  return (
    <div className="bg-white dark:bg-black text-black dark:text-zinc-50 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full flex justify-center">
            <Image src={product.image} alt={product.title} width={400} height={400} className="object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-3xl font-bold mb-6">${product.price}</p>
            <AddToCartButton product={product} />
          </div>
        </div>
      </main>
    </div>
  );
}
