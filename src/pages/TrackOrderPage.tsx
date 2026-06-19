import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, PackageSearch } from 'lucide-react';

const TrackOrderPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (orderId.trim()) setSearched(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <PackageSearch className="mx-auto mb-3 h-12 w-12 text-primary" />
            <h1 className="text-xl font-bold text-foreground md:text-2xl text-balance">Track Your Order</h1>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Enter your order reference number to check delivery status.
            </p>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <div className="space-y-3">
              <Label htmlFor="order-id" className="text-sm font-normal">Order Reference Number</Label>
              <Input
                id="order-id"
                placeholder="e.g. INF-2024-001234"
                value={orderId}
                onChange={(e) => { setOrderId(e.target.value); setSearched(false); }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
                Track Order
              </Button>
            </div>

            {searched && (
              <div className="mt-4 rounded-sm border border-border bg-muted p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  No order found for <span className="font-semibold text-foreground">{orderId}</span>.
                  Please check your reference number or{' '}
                  <button
                    className="text-primary underline-offset-2 hover:underline"
                    onClick={() => navigate('/contact')}
                  >
                    contact support
                  </button>.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="border-t border-border bg-card py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} INFOTECH INTERNET SERVICES. All rights reserved.
      </footer>
    </div>
  );
};

export default TrackOrderPage;
