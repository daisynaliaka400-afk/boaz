import React, { createContext, useContext, useState, useCallback } from 'react';
import { ADMIN_CREDENTIALS } from '@/lib/defaults';
import { supabase } from '@/db/supabase';

const SESSION_KEY = 'infotech_admin_session';

// The Supabase Auth email mapped to the hardcoded admin username.
// This lets `auth.role()` return 'authenticated' so RLS policies allow CRUD.
const ADMIN_EMAIL = 'boaz@infotech.admin';

interface AdminContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  login: async () => false,
  logout: async () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === 'true'; }
    catch { return false; }
  });

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    // Validate hardcoded credentials first
    if (
      username !== ADMIN_CREDENTIALS.username ||
      password !== ADMIN_CREDENTIALS.password
    ) {
      return false;
    }

    // Sign into Supabase Auth so the JWT role = 'authenticated' — required for RLS
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });

    if (error) {
      console.error('Supabase admin sign-in error:', error.message);
      // Still allow login for UI; CRUD may fail if RLS blocks
    }

    sessionStorage.setItem(SESSION_KEY, 'true');
    setIsAdmin(true);
    return true;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
