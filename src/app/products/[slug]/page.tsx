import type { Metadata } from 'next';
import ProductClient, { productDatabase } from './ProductClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const product = productDatabase[slug];
  if (!product) {
    return {
      title: "NEBULA Activewear",
      description: "Explore technical high-performance training clothing, shoes, and accessories by NEBULA.",
    };
  }

  // Format the title and description from the database item
  const title = `${product.title} | NEBULA`;
  const description = product.description.join(' ') || "Premium NEBULA activewear gear.";

  return {
    title,
    description,
    keywords: ["activewear", "performance", "training", "NEBULA", product.title.toLowerCase()],
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductClient params={params} />;
}
