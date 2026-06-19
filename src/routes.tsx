import type { ReactNode } from 'react';
import HomePage from './pages/HomePage';
import TrackOrderPage from './pages/TrackOrderPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  public?: boolean;
}

export const routes: RouteConfig[] = [
  { name: 'Home', path: '/', element: <HomePage />, public: true },
  { name: 'Track Order', path: '/track-order', element: <TrackOrderPage />, public: true },
  { name: 'How It Works', path: '/how-it-works', element: <HowItWorksPage />, public: true },
  { name: 'Contact', path: '/contact', element: <ContactPage />, public: true },
  { name: 'Admin Dashboard', path: '/admin', element: <AdminDashboard />, public: false },
];
