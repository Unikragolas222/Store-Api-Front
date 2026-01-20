import { Product } from '../interfaces/Product';

export async function getProductById(id: string): Promise<Product | null> {
  try {
    console.log(`Fetching product from API with ID: ${id}`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
        headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
        }
    });

    if (!res.ok) {
      console.error(`Error fetching product ${id}: Status ${res.status}`);
      return null;
    }

    const products = await res.json();
    const product = products?.[0];

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
