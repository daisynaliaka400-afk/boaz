import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone } from 'lucide-react';
import type { Package } from '@/types/types';
import { PAYMENT_URL } from '@/lib/defaults';

interface BuyModalProps {
  pkg: Package | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: () => void;
}

const PHONE_REGEX = /^(07|01)\d{8}$/;

const BuyModal: React.FC<BuyModalProps> = ({ pkg, open, onOpenChange, onProceed }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleProceed = () => {
    const cleaned = phone.trim();
    if (!PHONE_REGEX.test(cleaned)) {
      setError('Enter a valid Safaricom number (07xxxxxxxx or 01xxxxxxxx)');
      inputRef.current?.focus();
      return;
    }
    setError('');
    // Close modal first, show wait screen, then redirect within the same tab
    onOpenChange(false);
    onProceed();
    // Small delay so the wait screen renders before navigation
    setTimeout(() => {
      window.location.href = PAYMENT_URL;
    }, 400);
  };

  const handleClose = (v: boolean) => {
    if (!v) { setPhone(''); setError(''); }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-balance">Buy Bundle</DialogTitle>
        </DialogHeader>

        {pkg && (
          <div className="mb-4 rounded-sm border border-border bg-secondary p-4">
            <p className="text-sm font-medium text-foreground">{pkg.title}</p>
            <p className="price-text text-xl font-bold">Ksh {pkg.price}</p>
            <p className="text-xs text-muted-foreground">{pkg.validity}</p>
          </div>
        )}

        <div className="space-y-3">
          <Label htmlFor="phone-input" className="text-sm font-normal">
            Safaricom Phone Number
          </Label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="phone-input"
              ref={inputRef}
              type="tel"
              placeholder="07xxxxxxxx or 01xxxxxxxx"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setError(''); }}
              className="pl-9"
              maxLength={10}
              autoComplete="tel"
              onKeyDown={(e) => { if (e.key === 'Enter') handleProceed(); }}
            />
          </div>
          {error && (
            <p className="flex items-center gap-1 text-xs text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleClose(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-px"
            onClick={handleProceed}
          >
            Proceed to Pay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyModal;
