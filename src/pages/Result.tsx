import React, { useState } from "react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/components/site/useApp";
import { toast } from "sonner";
import hero from "@/assets/hero-3d.webp";
import { useNavigate } from "react-router-dom";

const Result: React.FC = () => {
  const { user, setShowLogin, loading: authLoading } = useApp();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to generate images");
      setShowLogin(true);
      return;
    }

    if (!input.trim()) {
      toast.error("Please enter a prompt to generate an image");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ prompt: input.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        toast.error(errorData.error || "Failed to generate image");
        return;
      }

      const data = await response.json();
      if (data.imageUrl) {
        setImage(data.imageUrl);
      } else {
        toast.error("Image generation failed");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </main>
    );
  }

  // Show sign-in prompt if user is not authenticated
  if (!user) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center py-12">
        <Seo
          title="Generate — Imagify AI"
          description="Generate AI images from text prompts."
          canonical={window.location.origin + "/result"}
        />
        <div className="text-center max-w-md">
          <img
            src={hero}
            alt="3D AI image generator preview"
            className="max-w-sm w-[22rem] h-auto rounded-xl border shadow animate-fade-in mb-6"
            loading="lazy"
          />
          <h1 className="text-2xl font-semibold mb-4">
            Sign in to Generate Images
          </h1>
          <p className="text-muted-foreground mb-6">
            Create an account or sign in to start generating amazing AI images
            from your text prompts.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => setShowLogin(true)}>Sign In</Button>
            <Button variant="outline" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center py-12">
      <Seo
        title="Generate — Imagify AI"
        description="Generate AI images from text prompts."
        canonical={window.location.origin + "/result"}
      />
      <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto px-4">
        <div className="relative">
          {image ? (
            <img
              src={image}
              alt="Generated AI image preview"
              className="max-w-sm w-full rounded-xl border shadow"
            />
          ) : (
            <img
              src={hero}
              alt="3D AI image generator preview"
              className="max-w-sm w-[22rem] h-auto rounded-xl border shadow animate-fade-in"
              loading="lazy"
            />
          )}
          {loading && (
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-sm">Generating image...</p>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={onSubmit}
          className="flex w-full max-w-xl bg-secondary text-foreground text-sm p-1 rounded-full"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to generate"
            className="flex-1 rounded-full border-0 bg-transparent"
            disabled={loading}
          />
          <Button type="submit" className="rounded-full" disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </form>

        {image && (
          <div className="flex gap-3 flex-wrap justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setImage(null);
                setInput("");
              }}
            >
              Generate Another
            </Button>
            <a href={image} download="generated-image.png">
              <Button>Download</Button>
            </a>
          </div>
        )}
      </div>
    </main>
  );
};

export default Result;
