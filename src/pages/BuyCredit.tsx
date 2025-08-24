import React from "react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  { id: "Starter", desc: "Great to try things out", price: 5, credits: 50 },
  { id: "Pro", desc: "For regular creators", price: 15, credits: 200 },
  { id: "Studio", desc: "For teams and pros", price: 29, credits: 500 },
];

const BuyCredit: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-[70vh] text-center pt-14 px-4 mb-10">
      <Seo title="Buy Credits — Imagify AI" description="Purchase credits to generate more AI images." canonical={window.location.origin + "/buy"} />
      <Button variant="outline" className="rounded-full text-sm mb-6">OUR PLANS</Button>
      <h1 className="text-3xl font-semibold mb-10">Choose the plan</h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 flex-wrap">
        {plans.map((p) => (
          <div key={p.id} className="w-full max-w-[300px] bg-card border rounded-xl shadow-sm p-8 hover-scale">
            <p className="text-lg font-semibold">{p.id}</p>
            <p className="text-sm text-muted-foreground mb-6">{p.desc}</p>
            <p className="text-2xl font-bold mb-1">${p.price}</p>
            <p className="text-sm text-muted-foreground mb-6">/ {p.credits} credits</p>
            <Button className="w-full" onClick={() => navigate(`/checkout?plan=${encodeURIComponent(p.id)}&price=${p.price}&credits=${p.credits}`)}>Purchase</Button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BuyCredit;
