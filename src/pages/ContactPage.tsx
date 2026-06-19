import React from 'react';
import Header from '@/components/Header';
import { Phone, Mail, MessageCircle, Clock } from 'lucide-react';

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+254 112 102 674',
    href: 'tel:+254112102674',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'support@infotechservices.co.ke',
    href: 'mailto:support@infotechservices.co.ke',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with us on WhatsApp',
    href: 'https://wa.me/254112102674',
  },
  {
    icon: Clock,
    label: 'Support Hours',
    value: '24 hours, 7 days a week',
    href: null,
  },
];

const ContactPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-2xl px-4 py-12 md:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-xl font-bold text-foreground md:text-3xl text-balance">Contact Us</h1>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">
            We're here to help 24/7. Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-center gap-4 rounded-sm border border-border bg-card p-5 h-full">
              <div className="shrink-0 rounded-sm bg-secondary p-2 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                {href ? (
                  <a
                    href={href}
                    className="text-sm font-medium text-primary hover:underline underline-offset-2 break-words"
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-sm border border-border bg-card p-5">
          <h2 className="mb-1 font-semibold text-foreground text-balance">Send us a Message</h2>
          <p className="text-sm text-muted-foreground text-pretty">
            For bundle-related queries, payment issues, or general support, email us at{' '}
            <a
              href="mailto:support@infotechservices.co.ke"
              className="text-primary hover:underline underline-offset-2"
            >
              support@infotechservices.co.ke
            </a>{' '}
            and we'll respond within 30 minutes during business hours.
          </p>
        </div>
      </main>
      <footer className="border-t border-border bg-card py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} INFOTECH INTERNET SERVICES. All rights reserved.
      </footer>
    </div>
  );
};

export default ContactPage;
