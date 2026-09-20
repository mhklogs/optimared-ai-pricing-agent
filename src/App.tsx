import { Routes, Route } from "react-router-dom";
import type { ReactNode } from "react";
import { ScrollToTop } from "./components/Base";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import DocsPage from "./pages/DocsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";

function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<MarketingLayout><HomePage /></MarketingLayout>} />
        <Route path="/features" element={<MarketingLayout><FeaturesPage /></MarketingLayout>} />
        <Route path="/pricing" element={<MarketingLayout><PricingPage /></MarketingLayout>} />
        <Route path="/docs" element={<MarketingLayout><DocsPage /></MarketingLayout>} />
        <Route path="/about" element={<MarketingLayout><AboutPage /></MarketingLayout>} />
        <Route path="/contact" element={<MarketingLayout><ContactPage /></MarketingLayout>} />
        <Route path="/privacy" element={<MarketingLayout><PrivacyPage /></MarketingLayout>} />
      </Routes>
    </>
  );
}
