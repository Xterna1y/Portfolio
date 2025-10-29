import { useState } from 'react';
import { Code, Database, Globe, Zap, Shield, Cpu, Palette, Layers } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skills = {
    frontend: [
      {
        name: 'React & Ecosystem',
        level: 92,
        description: 'Expert in React, Redux, React Router, and modern React patterns',
        icon: Code,
      },
      {
        name: 'TypeScript',
        level: 88,
        description: 'Strong typing skills, interfaces, generics, and advanced patterns',
        icon: Code,
      },
      {
        name: 'CSS & Tailwind',
        level: 85,
        description: 'Advanced CSS, animations, responsive design, and Tailwind CSS',
        icon: Palette,
      },
      {
        name: 'Vue.js',
        level: 70,
        description: 'Component-based development, Vue Router, and state management',
        icon: Code,
      },
    ],
    backend: [
      {
        name: 'Node.js & Express',
        level: 88,
        description: 'RESTful APIs, middleware, authentication, and microservices',
        icon: Database,
      },
      {
        name: 'Python & Django',
        level: 82,
        description: 'Web frameworks, data processing, and API development',
        icon: Cpu,
      },
      {
        name: 'PostgreSQL & MongoDB',
        level: 85,
        description: 'SQL and NoSQL databases, ORM, and query optimization',
        icon: Database,
      },
      {
        name: 'AWS & Cloud Services',
        level: 80,
        description: 'AWS deployment, CI/CD, and cloud architecture',
        icon: Globe,
      },
    ],
    tools: [
      {
        name: 'Git & GitHub',
        level: 95,
        description: 'Version control, collaboration, branching strategies, and CI/CD',
        icon: Shield,
      },
      {
        name: 'Docker & DevOps',
        level: 78,
        description: 'Containerization, deployment, and infrastructure management',
        icon: Layers,
      },
      {
        name: 'Testing & Quality',
        level: 85,
        description: 'Unit testing, integration testing, and code quality tools',
        icon: Zap,
      },
    ],
  };

  const categories = [
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Database },
    { id: 'tools', label: 'Tools', icon: Zap },
  ];

  const getSkillLevelColor = (level: number) => {
    if (level >= 85) return 'bg-green-500';
    if (level >= 75) return 'bg-blue-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive skillset across frontend, backend, and development tools
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={18} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {skills[activeCategory as keyof typeof skills].map((skill, index) => {
            const Icon = skill.icon;
            const levelColor = getSkillLevelColor(skill.level);
            
            return (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-xl font-bold text-gray-900 mb-1">{skill.name}</div>
                    <div className="text-gray-600 text-sm">{skill.description}</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{skill.level}%</div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ease-out ${levelColor}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;