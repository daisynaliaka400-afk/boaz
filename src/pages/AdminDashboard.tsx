import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { TrendingUp, ShoppingCart, Clock, PlusCircle, Pencil, Trash2, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useAdmin } from '@/contexts/AdminContext';
import { fetchPackages, insertPackage, updatePackage, deletePackage } from '@/services/api';
import { CATEGORY_LABELS } from '@/lib/defaults';
import type { Package, PackageFormData } from '@/types/types';
import PackageFormModal from '@/components/PackageFormModal';

const SALES_DATA = [
  { month: 'Jan', revenue: 18200 },
  { month: 'Feb', revenue: 21500 },
  { month: 'Mar', revenue: 19800 },
  { month: 'Apr', revenue: 25300 },
  { month: 'May', revenue: 22100 },
  { month: 'Jun', revenue: 27430 },
];

const SUMMARY_CARDS = [
  { label: 'Total Revenue', value: 'KES 125,430', icon: TrendingUp, color: 'text-primary' },
  { label: 'Total Orders', value: '1,248', icon: ShoppingCart, color: 'text-chart-5' },
  { label: 'Pending Payments', value: '28', icon: Clock, color: 'text-warning' },
];

const AdminDashboard: React.FC = () => {
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Package | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmDeletePkg, setConfirmDeletePkg] = useState<Package | null>(null);

  // Guard: redirect unauthenticated users. Skip on first render so that a
  // freshly-navigated admin session (state just written to sessionStorage) is
  // read back synchronously and does NOT trigger a false redirect.
  const hasChecked = React.useRef(false);
  useEffect(() => {
    if (!hasChecked.current) { hasChecked.current = true; return; }
    if (!isAdmin) { navigate('/'); }
  }, [isAdmin, navigate]);

  const loadPackages = useCallback(async () => {
    setLoading(true);
    const data = await fetchPackages();
    setPackages(data);
    setLoading(false);
  }, []);

  useEffect(() => { loadPackages(); }, [loadPackages]);

  const handleAdd = () => { setEditing(null); setFormOpen(true); };
  const handleEdit = (pkg: Package) => { setEditing(pkg); setFormOpen(true); };
  const handleDeleteRequest = (pkg: Package) => { setConfirmDeletePkg(pkg); };

  const handleSave = async (form: PackageFormData) => {
    if (editing) {
      const { error } = await updatePackage(editing.id, form);
      if (error) { toast.error('Update failed: ' + error); return; }
      toast.success('Bundle updated successfully.');
    } else {
      const { error } = await insertPackage(form);
      if (error) { toast.error('Add failed: ' + error); return; }
      toast.success('Bundle added successfully.');
    }
    await loadPackages();
  };

  const handleDeleteConfirmed = async () => {
    if (!confirmDeletePkg) return;
    const id = confirmDeletePkg.id;
    setConfirmDeletePkg(null);
    setDeleteId(id);
    const { error } = await deletePackage(id);
    setDeleteId(null);
    if (error) { toast.error('Delete failed: ' + error); return; }
    toast.success('Bundle deleted.');
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleLogout = async () => { await logout(); navigate('/'); };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="border-b border-border bg-card px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground md:text-xl text-balance">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">INFOTECH INTERNET SERVICES</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4" />
              <span className="sr-only md:not-sr-only">Back to Site</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only md:not-sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {SUMMARY_CARDS.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex items-center gap-4 rounded-sm border border-border bg-card p-4 h-full">
              <div className={`rounded-sm border border-border p-2 ${color}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xl font-bold text-foreground" style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sales Trend Chart */}
        <div className="mb-8 rounded-sm border border-border bg-card p-4">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Monthly Sales Trend (KES)</h2>
          <div className="w-full min-w-0 overflow-hidden">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={SALES_DATA} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`KES ${v.toLocaleString()}`, 'Revenue']} />
                <Legend layout="horizontal" wrapperStyle={{ paddingTop: 8 }} />
                <Bar dataKey="revenue" name="Revenue" fill="hsl(160 84% 30%)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Package CRUD Table */}
        <div className="rounded-sm border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold text-foreground">Package Bundles</h2>
            <Button
              size="sm"
              className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleAdd}
            >
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only md:not-sr-only">Add New Bundle</span>
            </Button>
          </div>

          {loading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 animate-pulse rounded-sm bg-muted" />
              ))}
            </div>
          ) : packages.length === 0 ? (
            <div className="px-4 py-12 text-center text-sm text-muted-foreground">
              No packages yet. Click "Add New Bundle" to get started.
            </div>
          ) : (
            <div className="w-full max-w-full overflow-x-auto">
              <table className="w-full min-w-max text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="whitespace-nowrap px-4 py-2 text-left text-xs font-semibold text-muted-foreground">Category</th>
                    <th className="whitespace-nowrap px-4 py-2 text-left text-xs font-semibold text-muted-foreground">Title</th>
                    <th className="whitespace-nowrap px-4 py-2 text-right text-xs font-semibold text-muted-foreground">Price (Ksh)</th>
                    <th className="whitespace-nowrap px-4 py-2 text-left text-xs font-semibold text-muted-foreground">Validity</th>
                    <th className="whitespace-nowrap px-4 py-2 text-right text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr
                      key={pkg.id}
                      className="border-b border-border transition-opacity last:border-0 hover:bg-muted/30"
                      style={{ opacity: deleteId === pkg.id ? 0.4 : 1, transition: 'opacity 200ms' }}
                    >
                      <td className="whitespace-nowrap px-4 py-2 text-xs text-muted-foreground">
                        {CATEGORY_LABELS[pkg.category] ?? pkg.category}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-foreground">{pkg.title}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-right price-text font-semibold">{pkg.price}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-muted-foreground">{pkg.validity}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-foreground hover:bg-muted"
                            onClick={() => handleEdit(pkg)}
                            aria-label="Edit bundle"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteRequest(pkg)}
                            disabled={deleteId === pkg.id}
                            aria-label="Delete bundle"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <PackageFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        editing={editing}
        onSave={handleSave}
      />

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={!!confirmDeletePkg}
        onOpenChange={(open) => { if (!open) setConfirmDeletePkg(null); }}
      >
        <AlertDialogContent className="max-w-[calc(100%-2rem)] md:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Bundle</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold text-foreground">
                {confirmDeletePkg?.title} — Ksh {confirmDeletePkg?.price}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteConfirmed}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
