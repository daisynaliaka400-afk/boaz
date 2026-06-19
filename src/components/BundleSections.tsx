import React, { useEffect, useState, useCallback } from 'react';
import { Wifi, MessageSquare, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchPackages } from '@/services/api';
import { DEFAULT_PACKAGES, CATEGORY_ORDER, CATEGORY_LABELS } from '@/lib/defaults';
import type { Package, PackageCategory } from '@/types/types';
import BuyModal from '@/components/BuyModal';
import PaymentWait from '@/components/PaymentWait';

const CATEGORY_ICONS: Record<PackageCategory, React.ReactNode> = {
  data_bundles: <Wifi className="h-5 w-5" />,
  buy_many_times: <RefreshCw className="h-5 w-5" />,
  sms_offers: <MessageSquare className="h-5 w-5" />,
  minutes_offers: <Clock className="h-5 w-5" />,
};

const PackageCard: React.FC<{ pkg: Package; onBuy: (pkg: Package) => void }> = ({ pkg, onBuy }) => (
  <div className="flex h-full flex-col rounded-sm border border-border bg-card p-4 transition-colors hover:border-primary">
    <div className="mb-3 flex-1">
      <p className="price-text text-2xl font-bold">Ksh {pkg.price}</p>
      <p className="mt-1 text-base font-semibold text-foreground">{pkg.title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{pkg.validity}</p>
    </div>
    <Button
      size="sm"
      className="mt-3 w-full bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-px"
      onClick={() => onBuy(pkg)}
    >
      Buy Now
    </Button>
  </div>
);

const BundleSections: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [waitVisible, setWaitVisible] = useState(false);

  const loadPackages = useCallback(async () => {
    setLoading(true);
    const data = await fetchPackages();
    if (data.length > 0) {
      setPackages(data);
    } else {
      // Use defaults mapped with synthetic ids
      const defaults = DEFAULT_PACKAGES.map((p, i) => ({
        ...p,
        id: `default-${i}`,
        created_at: new Date().toISOString(),
      })) as Package[];
      setPackages(defaults);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadPackages(); }, [loadPackages]);

  const handleBuy = (pkg: Package) => {
    setSelectedPkg(pkg);
    setBuyModalOpen(true);
  };

  const handleProceed = () => {
    setWaitVisible(true);
    // Auto-dismiss after 45 seconds if user navigates back
    setTimeout(() => setWaitVisible(false), 45000);
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-sm bg-muted" />
          ))}
        </div>
      </section>
    );
  }

  const grouped = CATEGORY_ORDER.reduce<Record<string, Package[]>>((acc, cat) => {
    acc[cat] = packages.filter((p) => p.category === cat);
    return acc;
  }, {} as Record<string, Package[]>);

  return (
    <>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        {CATEGORY_ORDER.map((cat) => {
          const items = grouped[cat];
          if (!items || items.length === 0) return null;
          return (
            <section key={cat} className="mb-12">
              <div className="mb-5 flex items-center gap-2">
                <span className="text-primary">{CATEGORY_ICONS[cat]}</span>
                <h2 className="text-lg font-bold text-foreground md:text-xl text-balance">
                  {CATEGORY_LABELS[cat]}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {items.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} onBuy={handleBuy} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <BuyModal
        pkg={selectedPkg}
        open={buyModalOpen}
        onOpenChange={setBuyModalOpen}
        onProceed={handleProceed}
      />

      {waitVisible && <PaymentWait />}
    </>
  );
};

export default BundleSections;
