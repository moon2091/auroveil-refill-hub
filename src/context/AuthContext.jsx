import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isConfigured } from '../lib/supabaseClient';

const AuthContext = createContext(null);

// Authorized team accounts
const VALID_CREDENTIALS = [
  {
    email: 'auroveilshop@gmail.com',
    password: '12345678',
    name: 'Auroveil Admin',
    role: 'Store Owner',
  },
  {
    email: 'team@auroveil.com',
    password: 'auroveil2026',
    name: 'Auroveil Team',
    role: 'Store Manager',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      const stored = localStorage.getItem('auroveil_team_user');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();

    if (isConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });
      if (error) throw error;
      return data;
    } else {
      // Validate against authorized team credentials
      const matched = VALID_CREDENTIALS.find(
        (acc) => acc.email.toLowerCase() === trimmedEmail && acc.password === password
      );

      if (!matched) {
        throw new Error('Invalid email or password. Please use your authorized Auroveil account.');
      }

      const authenticatedUser = {
        id: `user-${Date.now()}`,
        email: matched.email,
        name: matched.name,
        role: matched.role,
      };

      localStorage.setItem('auroveil_team_user', JSON.stringify(authenticatedUser));
      setUser(authenticatedUser);
      return { user: authenticatedUser };
    }
  };

  const logout = async () => {
    if (isConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('auroveil_team_user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
