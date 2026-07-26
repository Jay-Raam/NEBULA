import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "NEBULA | Contact Support & Help Center",
  description: "Get in touch with NEBULA customer support in Aarhus, Denmark. Send a message, call +45 88 70 49 60, or search our quick help FAQs.",
};

export default function ContactPage() {
  return <ContactClient />;
}
