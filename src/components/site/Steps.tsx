import React from "react";

const steps = [
  { title: "Write a prompt", description: "Describe what you want to see" },
  { title: "Pick style", description: "Choose aspect, style and quality" },
  { title: "Generate", description: "Hit generate and refine results" },
];

export const Steps: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center my-16">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-2">How it works</h2>
      <p className="text-lg text-muted-foreground mb-6">Transform words into stunning images</p>
      <div className="space-y-3 w-full max-w-3xl text-sm">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-4 p-5 px-8 bg-card shadow-sm border rounded-lg hover-scale">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-semibold">{i + 1}</div>
            <div>
              <h3 className="text-base font-medium">{s.title}</h3>
              <p className="text-muted-foreground">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
