import React, { useMemo, useState } from "react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner"; // Assuming sonner is the source of the toast

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const plan = params.get("plan") || "Starter";
  const price = Number(params.get("price") || 5);
  const credits = Number(params.get("credits") || 50);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !card || !expiry || !cvc) {
      // Logo will be removed from here
      toast.error("Please fill all fields"); 
      return;
    }
    // Logo will be removed from here
    toast.success("Payment gateway coming soon. This is a demo checkout.");
    
    const currentCredits = Number(localStorage.getItem("userCredits")) || 0;
    const newTotalCredits = currentCredits + credits;
    localStorage.setItem("userCredits", newTotalCredits.toString());

    navigate("/");
  };

  return (
    <main className="min-h-[70vh] pt-10 px-4">
      <Seo title="Checkout — Imagify AI" description="Secure checkout to purchase credits for AI image generation." canonical={window.location.origin + "/checkout"} />
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle>Billing details</CardTitle>
            <CardDescription>Enter your information to complete purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="text-sm block mb-1">Full name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
              </div>
              <div>
                <label className="text-sm block mb-1">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" />
              </div>
              <div>
                <label className="text-sm block mb-1">Card number</label>
                <Input value={card} onChange={(e) => setCard(e.target.value)} placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm block mb-1">Expiry</label>
                  <Input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" />
                </div>
                <div>
                  <label className="text-sm block mb-1">CVC</label>
                  <Input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" />
                </div>
              </div>
              <CardFooter className="px-0">
                <Button type="submit" className="w-full rounded-full">Pay now — ${price}</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card border">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
            <CardDescription>Your selected plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Plan</span>
                <span className="font-medium">{plan}</span>
              </div>
              <div className="flex justify-between">
                <span>Credits</span>
                <span className="font-medium">{credits}</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-semibold">${price}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Checkout;