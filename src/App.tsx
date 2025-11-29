import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import About from './app/About/page'
import Projects from './app/Projects/page';
import Skills from './app/Skills/page';
import Contact from './app/Contacts/page';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
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
