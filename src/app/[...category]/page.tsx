import type { Metadata } from 'next';
import CategoryClient from './CategoryClient';

interface Props {
  params: Promise<{ category: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const pathArray = resolvedParams.category || [];
  
  // Format title based on categories
  const categories = pathArray.map(c => c.toUpperCase());
  let title = "NEBULA Collection";
  let description = "Explore the premium training gear, technical running apparel, and high-performance outerwear from NEBULA.";

  if (categories.includes('SALE')) {
    title = "Final Sale | NEBULA Activewear";
    description = "Shop the NEBULA final sale collection. Take special discounts on technical tights, jackets, and accessories.";
  } else if (categories.includes('MEN')) {
    title = "Men's Performance Apparel | NEBULA";
    description = "Explore men's wind-breakers, running shorts, compression shirts, and trail shoes from NEBULA.";
  } else if (categories.includes('WOMEN')) {
    title = "Women's Athletic Gear | NEBULA";
    description = "Discover women's running tights, support training tops, jackets, and accessories designed by NEBULA.";
  } else if (categories.includes('ACCESSORIES')) {
    title = "Tactical Accessories & Training Gear | NEBULA";
    description = "Explore NEBULA backpacks, waist bags, beanies, caps, and water bottles designed for extreme endurance.";
  }

  return {
    title,
    description,
    keywords: ["activewear", "running", "training", "danish design", "special forces", "NEBULA", ...pathArray],
  };
}

export default function CategoryPage({ params }: Props) {
  return <CategoryClient params={params} />;
}
