import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Menu, X, Headphones, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AdminLoginModal from '@/components/AdminLoginModal';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Track Order', to: '/track-order' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Contact Us', to: '/contact' },
];

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <CheckCircle className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="text-sm font-bold tracking-tight text-foreground md:text-base">
              INFOTECH INTERNET SERVICES
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <a href="tel:+254112102674">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Headphones className="h-4 w-4" />
                Support
              </Button>
            </a>
            <Button
              size="sm"
              className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setAdminModalOpen(true)}
            >
              <ShieldCheck className="h-4 w-4" />
              Admin Login
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden border border-border">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background pt-12">
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-sm px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(link.to)
                        ? 'bg-secondary text-primary'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2 px-4">
                  <a href="tel:+254112102674" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full gap-1.5">
                      <Headphones className="h-4 w-4" />
                      Support
                    </Button>
                  </a>
                  <Button
                    size="sm"
                    className="w-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => { setMobileOpen(false); setAdminModalOpen(true); }}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin Login
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <AdminLoginModal open={adminModalOpen} onOpenChange={setAdminModalOpen} />
    </>
  );
};

export default Header;
