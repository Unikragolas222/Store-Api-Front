
import { Product } from '../interfaces/Product';

export async function getProductById(id: string): Promise<Product | null> {
  try {
    console.log(`Fetching product from API with ID: ${id}`);
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) {
      console.error(`Error fetching product ${id}: Status ${res.status}`);
      return null;
    }

    const product = await res.json();

    if (!product || !product.id) {
        console.warn(`API returned invalid data for product ID: ${id}`);
        return null;
    }

    return product;

  } catch (error) {
    console.error(`Failed to fetch or parse product ${id}:`, error);
    return null;
  }
}
