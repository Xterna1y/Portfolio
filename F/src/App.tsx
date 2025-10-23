import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Hero from './components/ui/Hero';
import About from './app/About/page'
import Projects from './app/Projects/page';
import Skills from './app/Skills/page';
import Contact from './app/Contacts/page';
import Footer from './components/ui/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <Navbar />
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
