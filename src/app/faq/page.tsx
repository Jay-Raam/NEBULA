import type { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: "NEBULA | Frequently Asked Questions",
  description: "Get help with shipping times, international delivery rates, return procedures, exchanges, and unisex sizing specifications at NEBULA.",
};

export default function FAQPage() {
  return <FAQClient />;
}
