import React from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import Home from "@/pages/Home";

const Landing: React.FC = () => {
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-[image:var(--gradient-subtle)]">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default Landing;
