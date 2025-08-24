import React, { useState } from "react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import login3d from "@/assets/login-3d.webp";
import { useApp } from "@/components/site/useApp";
import { toast } from "sonner";

const Signup: React.FC = () => {
  const { signInWithGoogle, setShowLogin, signUpWithEmail } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      await signUpWithEmail(email, password, name);
      // Clear form on success
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // Error is handled in the context
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      // Error is handled in the context
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-[70vh] pt-10 px-4">
      <Seo title="Sign Up — Imagify AI" description="Create your Imagify AI account to generate stunning images." canonical={window.location.origin + "/signup"} />
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
        <div className="text-center md:text-left animate-fade-in">
          <img 
            src={login3d} 
            alt="3D signup illustration for AI image app" 
            className="mx-auto md:mx-0 max-w-full h-auto rounded-xl shadow-[var(--shadow-elegant)] hover-scale" 
            loading="lazy" 
            decoding="async" 
          />
        </div>
        <div className="max-w-md mx-auto md:mx-0">
          <h1 className="text-3xl font-semibold mb-6">Create your account</h1>
          <div className="space-y-4 bg-card border rounded-xl p-6">
            <Button 
              type="button" 
              variant="secondary" 
              className="w-full rounded-full" 
              onClick={handleGoogleSignup}
              disabled={googleLoading}
            >
              {googleLoading ? "Creating account..." : "Continue with Google"}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>
            
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm block mb-1">Full name</label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Jane Doe" 
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-sm block mb-1">Email</label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="jane@example.com" 
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-sm block mb-1">Password</label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full rounded-full" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>
            
            <p className="text-sm text-muted-foreground text-center">
              Already have an account? {" "}
              <button 
                type="button" 
                className="text-primary hover:underline font-medium" 
                onClick={() => setShowLogin(true)}
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;