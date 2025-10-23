import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react';

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver'];
  
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-90"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900">
              Hi, I'm <span className="text-blue-600">Your Name</span>
            </h1>
            <div className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 h-12">
              <span className="border-r-2 border-blue-600 pr-2">{text}</span>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Passionate about creating beautiful, functional web applications that solve real-world problems. 
            Specializing in modern JavaScript frameworks and responsive design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Get In Touch
            </a>
            <a
              href="/resume.pdf"
              download
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-blue-600 hover:text-blue-600 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>

          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-200"
                  aria-label={link.label}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-gray-600 hover:text-blue-600">
            <ArrowDown size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;