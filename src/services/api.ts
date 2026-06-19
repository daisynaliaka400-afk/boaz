import { supabase } from '@/db/supabase';
import type { Package, PackageFormData } from '@/types/types';

export async function fetchPackages(): Promise<Package[]> {
  const { data, error } = await supabase
    .from('packages')
    .select('id, category, title, price, validity, created_at')
    .order('created_at', { ascending: true })
    .limit(200);

  if (error) {
    console.error('fetchPackages error:', error.message);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function insertPackage(form: PackageFormData): Promise<{ error: string | null }> {
  const { error } = await supabase.from('packages').insert({
    category: form.category,
    title: form.title.trim(),
    price: Number(form.price),
    validity: form.validity.trim(),
  });
  if (error) return { error: error.message };
  return { error: null };
}

export async function updatePackage(id: string, form: PackageFormData): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('packages')
    .update({
      category: form.category,
      title: form.title.trim(),
      price: Number(form.price),
      validity: form.validity.trim(),
    })
    .eq('id', id);
  if (error) return { error: error.message };
  return { error: null };
}

export async function deletePackage(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('packages').delete().eq('id', id);
  if (error) return { error: error.message };
  return { error: null };
}
