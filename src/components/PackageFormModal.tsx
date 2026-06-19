import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';
import type { Package, PackageCategory, PackageFormData } from '@/types/types';
import { CATEGORY_LABELS } from '@/lib/defaults';

const CATEGORIES: PackageCategory[] = ['data_bundles', 'buy_many_times', 'sms_offers', 'minutes_offers'];

interface PackageFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: Package | null;
  onSave: (form: PackageFormData) => Promise<void>;
}

const PackageFormModal: React.FC<PackageFormModalProps> = ({ open, onOpenChange, editing, onSave }) => {
  const [form, setForm] = useState<PackageFormData>(() => editing
    ? { category: editing.category, title: editing.title, price: editing.price, validity: editing.validity }
    : { category: 'data_bundles', title: '', price: '', validity: '' }
  );
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Sync when editing changes
  React.useEffect(() => {
    if (open) {
      setForm(editing
        ? { category: editing.category, title: editing.title, price: editing.price, validity: editing.validity }
        : { category: 'data_bundles', title: '', price: '', validity: '' }
      );
      setError('');
    }
  }, [open, editing]);

  const validate = () => {
    if (!form.title.trim()) return 'Title is required.';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) return 'Enter a valid price.';
    if (!form.validity.trim()) return 'Validity is required.';
    return '';
  };

  const handleSave = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setSaving(true);
    await onSave(form);
    setSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-balance">
            {editing ? 'Edit Bundle' : 'Add New Bundle'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label className="text-sm font-normal">Category</Label>
            <Select
              value={form.category}
              onValueChange={(v) => setForm((f) => ({ ...f, category: v as PackageCategory }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {CATEGORY_LABELS[cat]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pkg-title" className="text-sm font-normal">Title (e.g. 1GB, 250MB)</Label>
            <Input
              id="pkg-title"
              placeholder="1GB"
              value={form.title}
              onChange={(e) => { setForm((f) => ({ ...f, title: e.target.value })); setError(''); }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pkg-price" className="text-sm font-normal">Price (Ksh)</Label>
            <Input
              id="pkg-price"
              type="number"
              min={1}
              placeholder="50"
              value={form.price}
              onChange={(e) => { setForm((f) => ({ ...f, price: e.target.value })); setError(''); }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pkg-validity" className="text-sm font-normal">Validity (e.g. 24 hrs, 7 Days)</Label>
            <Input
              id="pkg-validity"
              placeholder="24 hrs"
              value={form.validity}
              onChange={(e) => { setForm((f) => ({ ...f, validity: e.target.value })); setError(''); }}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-sm border border-destructive/30 bg-destructive/10 px-3 py-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Save Bundle'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackageFormModal;
