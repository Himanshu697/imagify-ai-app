import React from "react";
import hero from "@/assets/hero-3d.webp";

export const Description: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center my-20 p-6">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-2">Create AI Images</h2>
      <p className="text-muted-foreground mb-8">Turn your imagination into visuals</p>
      <div className="flex flex-col gap-8 md:flex-row items-center md:gap-14">
        <img src={hero} alt="Sample AI image preview" className="w-80 xl:w-96 max-w-full h-auto rounded-lg shadow" loading="lazy" decoding="async" />
        <article>
          <h3 className="text-2xl font-medium max-w-lg">Introducing the AI‑Powered Text to Image Generator</h3>
          <p className="text-muted-foreground mb-4">Bring your ideas to life with cutting-edge diffusion models and smart prompting tools.</p>
          <p className="text-muted-foreground mb-4">Generate high-quality visuals for social, branding, and creative exploration in just a few clicks.</p>
        </article>
      </div>
    </section>
  );
};
