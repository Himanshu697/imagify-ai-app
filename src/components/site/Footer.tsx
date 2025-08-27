import React from "react";
import { Github, Twitter, Instagram } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-between gap-4 py-8 mt-16 border-t">
      <div className="flex items-center gap-2">
        <span className="font-semibold">Imagify AI</span>
      </div>
      <p className="flex-1 border-l pl-4 text-sm text-muted-foreground max-sm:hidden">
        © {new Date().getFullYear()} imagify.ai — All rights reserved
      </p>
      <div className="flex gap-3 text-muted-foreground">
        <a className="hover:text-foreground" href="#" aria-label="Twitter"><Twitter /></a>
        <a className="hover:text-foreground" href="#" aria-label="Instagram"><Instagram /></a>
        <a className="hover:text-foreground" href="https://github.com/Himanshu697/imagify-ai-app" aria-label="Github"><Github /></a>
      </div>
    </footer>
  );
};