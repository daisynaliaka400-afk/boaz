import type { Package } from '@/types/types';

export const DEFAULT_PACKAGES: Omit<Package, 'id' | 'created_at'>[] = [
  // DATA BUNDLES – BUY ONCE DAILY
  { category: 'data_bundles', title: '250MB', price: 20, validity: '24 hrs' },
  { category: 'data_bundles', title: '1GB', price: 19, validity: '1 hr' },
  { category: 'data_bundles', title: '1.5GB', price: 50, validity: '3 hrs' },
  { category: 'data_bundles', title: '1.25GB', price: 55, validity: 'Till Midnight' },
  { category: 'data_bundles', title: '1GB', price: 99, validity: '24 hrs' },
  { category: 'data_bundles', title: '350MB', price: 49, validity: '7 Days' },
  { category: 'data_bundles', title: '2.5GB', price: 300, validity: '7 Days' },
  // BUY MANY TIMES OFFERS
  { category: 'buy_many_times', title: '2GB', price: 110, validity: '24 hrs' },
  { category: 'buy_many_times', title: '1GB', price: 22, validity: '1 hr' },
  { category: 'buy_many_times', title: '1.5GB', price: 52, validity: '3 hrs' },
  // SMS OFFERS
  { category: 'sms_offers', title: '20 SMS', price: 5, validity: '24 hrs' },
  { category: 'sms_offers', title: '200 SMS', price: 10, validity: '24 hrs' },
  { category: 'sms_offers', title: '1000 SMS', price: 30, validity: '7 Days' },
  // MINUTES OFFERS
  { category: 'minutes_offers', title: '45 Mins', price: 21, validity: '3 hrs' },
  { category: 'minutes_offers', title: '50 Mins', price: 51, validity: 'Till Midnight' },
  { category: 'minutes_offers', title: 'Credo 200', price: 54, validity: 'Till Midnight' },
  { category: 'minutes_offers', title: '250 Mins', price: 200, validity: '7 Days' },
];

export const CATEGORY_LABELS: Record<string, string> = {
  data_bundles: 'Data Bundles – Buy Once Daily',
  buy_many_times: 'Buy Many Times Offers',
  sms_offers: 'SMS Offers',
  minutes_offers: 'Minutes Offers',
};

export const CATEGORY_ORDER = ['data_bundles', 'buy_many_times', 'sms_offers', 'minutes_offers'] as const;

export const PAYMENT_URL = 'https://pay.gifted.co.ke/pay/infotechservices';

export const ADMIN_CREDENTIALS = {
  username: 'boaz',
  password: '123456789',
};
