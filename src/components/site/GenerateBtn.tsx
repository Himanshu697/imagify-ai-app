import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Stars } from "lucide-react";

export const GenerateBtn: React.FC = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set initial credits to 4 for a free trial.
  const [credits, setCredits] = useState(() => {
    const savedCredits = localStorage.getItem("userCredits");
    return savedCredits !== null ? parseInt(savedCredits, 10) : 4;
  });

  useEffect(() => {
    // Save credits to localStorage whenever the state changes.
    localStorage.setItem("userCredits", credits.toString());
  }, [credits]);

  const handleGenerate = async () => {
    // Check if user has enough credits.
    if (credits <= 0) {
      alert("You have run out of credits! Please purchase more to continue.");
      navigate("/buy"); // Navigate to your payment page.
      return;
    }

    setIsLoading(true);

    try {
      // This is the corrected URL for your Supabase Edge Function.
      const response = await fetch("https://ovatsnoguqszydaemvd.supabase.co/functions/v1/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image.");
      }

      const data = await response.json();
      console.log("Image generated:", data.imageUrl);
      
      // Successfully generated, so decrement credits.
      setCredits((prevCredits) => prevCredits - 1);

      // Navigate to the result page with the image URL.
      navigate(`/result?imageUrl=${encodeURIComponent(data.imageUrl)}`);

    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pb-16 text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold py-6 md:py-12">See the magic. Try now</h2>
      
      <div className="flex flex-col items-center">
        <p className="mb-4">Credits remaining: {credits}</p>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          className="border p-2 rounded w-full max-w-md mb-4"
        />
        <Button
          variant="hero"
          size="lg"
          onClick={handleGenerate}
          disabled={isLoading || prompt.trim() === ""}
        >
          {isLoading ? "Generating..." : "Generate Images"} <Stars className="ml-2" />
        </Button>
      </div>
    </section>
  );
};