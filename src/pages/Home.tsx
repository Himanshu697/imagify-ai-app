import React from "react";
import { Header } from "@/components/site/Header";
import { Steps } from "@/components/site/Steps";
import { Description } from "@/components/site/Description";
import { Testimonials } from "@/components/site/Testimonials";
import { GenerateBtn } from "@/components/site/GenerateBtn";
import { Seo } from "@/components/Seo";

const Home: React.FC = () => {
  return (
    <main>
      <Seo title="Imagify AI — Text to Image" description="Create AI images in seconds from text prompts." canonical={window.location.origin + "/"} />
      <Header />
      <Steps />
      <Description />
      <Testimonials />
      <GenerateBtn />
    </main>
  );
};

export default Home;
