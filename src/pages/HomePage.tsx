import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BundleSections from '@/components/BundleSections';

const HomePage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <Hero />
      <BundleSections />
      <footer className="border-t border-border bg-card py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} INFOTECH INTERNET SERVICES. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
