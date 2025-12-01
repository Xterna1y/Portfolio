// src/App.tsx
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./app/About/page";
import Projects from "./app/Projects/page";
import Skills from "./app/Skills/page";
import Contact from "./app/Contacts/page";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  // Remove any hash on first load (so user lands on hero),
  // but do not disable anchor navigation after first load.
  useEffect(() => {
    // If a hash exists from previous navigation or a deploy, remove it.
    if (window.location.hash) {
      // Remove the hash from the URL without creating a history entry
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    // Ensure we start at the top (hero)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    // Run only once on mount
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
