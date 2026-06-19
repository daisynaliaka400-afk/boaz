import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

interface AdminLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ open, onOpenChange }) => {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    const ok = await login(username.trim(), password);
    setLoading(false);
    if (ok) {
      onOpenChange(false);
      setUsername(''); setPassword('');
      navigate('/admin');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleClose = (v: boolean) => {
    if (!v) { setUsername(''); setPassword(''); setError(''); }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <DialogTitle className="text-balance">Admin Login</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="admin-user" className="text-sm font-normal">Username</Label>
            <Input
              id="admin-user"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              autoComplete="username"
              onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-pw" className="text-sm font-normal">Password</Label>
            <div className="relative">
              <Input
                id="admin-pw"
                type={showPw ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="pr-10"
                autoComplete="current-password"
                onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPw((p) => !p)}
                tabIndex={-1}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-sm border border-destructive/30 bg-destructive/10 px-3 py-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}

          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLoginModal;
