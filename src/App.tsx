import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Download from "./components/Download";
import Contact from "./components/Contact";
import Footer, { FloatingWhatsApp } from "./components/Footer";

export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Download />
        <Contact />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
