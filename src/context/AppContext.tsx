import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type AppUser = {
  id: string;
  email?: string;
  name?: string | null;
  avatar_url?: string | null;
};

export type AppContextType = {
  user: AppUser | null;
  showLogin: boolean;
  setShowLogin: (v: boolean) => void;
  credit: number;
  setCredit: (n: number) => void;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  generateImage: (prompt: string) => Promise<string | null>;
  loading: boolean;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [credit, setCredit] = useState<number>(5);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
            avatar_url: session.user.user_metadata?.avatar_url
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
            avatar_url: session.user.user_metadata?.avatar_url
          });
          setShowLogin(false);
          toast.success("Successfully signed in!");
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setCredit(5); // Reset credits on logout
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('Google sign-in error:', error);
        toast.error(`Google sign-in failed: ${error.message}`);
        throw error;
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast.error(`Google sign-in failed: ${error.message}`);
      throw error;
    }
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Email sign-in error:', error);
        toast.error(`Sign-in failed: ${error.message}`);
        throw error;
      }
    } catch (error: any) {
      console.error('Email sign-in error:', error);
      throw error;
    }
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            name: name
          }
        }
      });
      
      if (error) {
        console.error('Email sign-up error:', error);
        toast.error(`Sign-up failed: ${error.message}`);
        throw error;
      }
      
      toast.success("Account created successfully! Please check your email to verify your account.");
    } catch (error: any) {
      console.error('Email sign-up error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast.error(`Logout failed: ${error.message}`);
      } else {
        setUser(null);
        setCredit(5);
        toast.success("Logged out successfully");
      }
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(`Logout failed: ${error.message}`);
    }
  }, []);

  const generateImage = useCallback(async (prompt: string) => {
    try {
      if (!user) {
        toast.error("Please sign in to generate images");
        setShowLogin(true);
        return null;
      }

      if (!prompt?.trim()) {
        toast.error("Please enter a prompt to generate an image");
        return null;
      }
      
      if (credit <= 0) {
        toast.error("No credits left. Please purchase more credits.");
        return null;
      }

      console.log('Generating image with prompt:', prompt);
      toast.info("Generating image... This may take a few seconds.");

      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: prompt.trim() }
      });

      console.log('Generate image response:', { data, error });

      if (error) {
        console.error('Error calling generate-image function:', error);
        toast.error(`Failed to generate image: ${error.message || 'Unknown error'}`);
        return null;
      }

      if (!data?.imageUrl) {
        console.error('No image URL in response:', data);
        toast.error("No image generated - please try again");
        return null;
      }

      setCredit((c) => Math.max(0, c - 1));
      toast.success("Image generated successfully!");
      return data.imageUrl;
    } catch (e: any) {
      console.error('Generate image error:', e);
      toast.error(`Error: ${e?.message || "Failed to generate image"}`);
      return null;
    }
  }, [credit, user]);

  const value = useMemo<AppContextType>(() => ({
    user,
    showLogin,
    setShowLogin,
    credit,
    setCredit,
    logout,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    generateImage,
    loading,
  }), [user, showLogin, credit, logout, signInWithGoogle, signInWithEmail, signUpWithEmail, generateImage, loading]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};