import React from 'react';
import Header from '@/components/Header';
import { ShoppingCart, Phone, CheckCircle, Zap } from 'lucide-react';

const STEPS = [
  {
    icon: ShoppingCart,
    title: '1. Choose Your Bundle',
    description:
      'Browse our Data, SMS, or Minutes bundles and click "Buy Now" on the package that suits you.',
  },
  {
    icon: Phone,
    title: '2. Enter Your Number',
    description:
      'Enter your Safaricom phone number (07xxxxxxxx or 01xxxxxxxx) in the secure popup.',
  },
  {
    icon: Zap,
    title: '3. Complete M-Pesa Payment',
    description:
      'You will receive an M-Pesa STK push prompt on your phone. Enter your PIN to confirm the payment.',
  },
  {
    icon: CheckCircle,
    title: '4. Bundle Activated Instantly',
    description:
      'Your bundle is activated within seconds after successful payment. No delays, no registration needed.',
  },
];

const HowItWorksPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-xl font-bold text-foreground md:text-3xl text-balance">How It Works</h1>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">
            Buy your bundle in 4 simple steps — no account required.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {STEPS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 rounded-sm border border-border bg-card p-5 h-full">
              <div className="shrink-0 rounded-sm bg-secondary p-2 text-primary h-fit">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-balance">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground text-pretty">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-sm border border-primary/30 bg-secondary p-5">
          <h3 className="font-semibold text-foreground text-balance">Important Notes</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              All payments are processed securely via M-Pesa.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Bundles are applicable on the Safaricom network only.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              No account or registration is required to purchase.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              For any issues, contact our 24/7 support team.
            </li>
          </ul>
        </div>
      </main>
      <footer className="border-t border-border bg-card py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} INFOTECH INTERNET SERVICES. All rights reserved.
      </footer>
    </div>
  );
};

export default HowItWorksPage;
