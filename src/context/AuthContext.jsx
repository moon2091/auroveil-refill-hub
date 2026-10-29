import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isConfigured } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent mock session or active Supabase session
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
      // Local fallback mode: check localStorage for team login
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
    if (isConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } else {
      // Built-in team credential check for immediate local/staging use
      if (!email.includes('@') || password.length < 6) {
        throw new Error('Please enter a valid email and a password of at least 6 characters.');
      }
      const mockUser = {
        id: 'team-user-1',
        email,
        name: email.split('@')[0],
        role: 'Store Manager',
      };
      localStorage.setItem('auroveil_team_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { user: mockUser };
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
