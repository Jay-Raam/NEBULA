import type { Metadata } from 'next';
import AccountClient from './AccountClient';

export const metadata: Metadata = {
  title: "NEBULA | Member Account Dashboard",
  description: "Access your guest profile settings, subscription status, and shipment order history logs at NEBULA.",
};

export default function MyAccountPage() {
  return <AccountClient />;
}
