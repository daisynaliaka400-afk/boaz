export type PackageCategory = 'data_bundles' | 'buy_many_times' | 'sms_offers' | 'minutes_offers';

export interface Package {
  id: string;
  category: PackageCategory;
  title: string;
  price: number;
  validity: string;
  created_at: string;
}

export interface PackageFormData {
  category: PackageCategory;
  title: string;
  price: number | string;
  validity: string;
}
