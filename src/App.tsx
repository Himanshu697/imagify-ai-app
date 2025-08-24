import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import { Navbar } from "./components/site/Navbar";
import { Footer } from "./components/site/Footer";
import { LoginDialog } from "./components/auth/LoginDialog";
import { AppContextProvider } from "./context/AppContext";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppContextProvider>
        <Toaster />
        <Sonner />
        <ThemeProvider>
          <BrowserRouter>
            <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-[image:var(--gradient-subtle)]">
              <Navbar />
              <LoginDialog />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/result" element={<Result />} />
                <Route path="/buy" element={<BuyCredit />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </AppContextProvider>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
