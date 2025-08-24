import React from "react";

const testimonials = [
  { name: "Aarav", role: "Designer", text: "Super fast and the quality is fantastic!", stars: 5 },
  { name: "Meera", role: "Marketer", text: "Perfect for campaign visuals on the fly.", stars: 5 },
  { name: "Rohan", role: "Founder", text: "Saved us time and money.", stars: 4 },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center my-16 px-6">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-2">Customer testimonials</h2>
      <p className="text-muted-foreground mb-8">What our users are saying</p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-card p-6 rounded-lg border shadow-sm hover-scale">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center font-semibold">{t.name[0]}</div>
              <h3 className="text-base font-semibold mt-3">{t.name}</h3>
              <p className="text-muted-foreground mb-3">{t.role}</p>
              <div className="mb-3">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
              <p className="text-sm text-muted-foreground">{t.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
