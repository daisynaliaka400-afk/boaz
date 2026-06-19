import React from 'react';
import { Zap, Lock, Clock } from 'lucide-react';

const PILLS = [
  { icon: Zap, label: 'Fast Delivery' },
  { icon: Lock, label: 'Secure Payment' },
  { icon: Clock, label: '24/7 Support' },
];

const Hero: React.FC = () => {
  return (
    <section className="hero-section w-full py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-start gap-6 md:max-w-2xl">
          <h1 className="text-2xl font-bold leading-tight text-white md:text-4xl text-balance">
            Stay Connected, Stay Ahead.
          </h1>
          <p className="text-base leading-relaxed text-white/85 md:text-lg text-pretty">
            Buy affordable data, SMS and minutes bundles instantly and securely.
          </p>
          <div className="flex flex-wrap gap-3">
            {PILLS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 rounded-sm border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white"
              >
                <Icon className="h-4 w-4 text-green-400" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
