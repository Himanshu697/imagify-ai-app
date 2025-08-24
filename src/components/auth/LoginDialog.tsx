import React, { useState } from "react";
import loginArt from "@/assets/login-3d.webp";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "../site/useApp";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const LoginDialog: React.FC = () => {
  const { showLogin, setShowLogin, signInWithGoogle, signInWithEmail } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      // Clear form on success
      setEmail("");
      setPassword("");
    } catch (error) {
      // Error is handled in the context
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      // Error is handled in the context
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignUpRedirect = () => {
    setShowLogin(false);
    navigate("/signup");
  };

  return (
    <Dialog open={showLogin} onOpenChange={setShowLogin}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Welcome back</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="rounded-xl overflow-hidden">
            <img src={loginArt} alt="Auth illustration" className="w-full h-40 object-cover" />
          </div>
          
          <Button 
            variant="secondary" 
            onClick={handleGoogleLogin} 
            className="w-full"
            disabled={googleLoading}
          >
            {googleLoading ? (
              <span className="mr-2">Signing in...</span>
            ) : (
              <span className="mr-2">Continue with Google</span>
            )}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
          
          <form className="grid gap-3" onSubmit={handleEmailLogin}>
            <Input 
              placeholder="Email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Input 
              placeholder="Password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button 
                type="button" 
                className="text-primary hover:underline font-medium"
                onClick={handleSignUpRedirect}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};