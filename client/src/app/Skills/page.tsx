import { useState } from 'react';
import { Code, Database, Palette, Server, Smartphone, Globe } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const categories = [
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'tools', label: 'Tools', icon: Globe },
  ];

  const skills = {
    frontend: [
      { name: 'React.js', level: 90, description: 'Expert in React hooks, context, and modern patterns' },
      { name: 'TypeScript', level: 85, description: 'Strong typing and interface design' },
      { name: 'Next.js', level: 80, description: 'SSR, SSG, and API routes' },
      { name: 'Tailwind CSS', level: 88, description: 'Utility-first CSS framework' },
      { name: 'Vue.js', level: 75, description: 'Component-based development' },
      { name: 'JavaScript ES6+', level: 92, description: 'Modern JavaScript features' },
    ],
    backend: [
      { name: 'Node.js', level: 85, description: 'Express, Koa, and RESTful APIs' },
      { name: 'Python', level: 80, description: 'Django, Flask, and FastAPI' },
      { name: 'Java', level: 70, description: 'Spring Boot and microservices' },
      { name: 'PHP', level: 65, description: 'Laravel and modern PHP' },
      { name: 'GraphQL', level: 75, description: 'API design and implementation' },
      { name: 'REST APIs', level: 90, description: 'RESTful service design' },
    ],
    database: [
      { name: 'PostgreSQL', level: 85, description: 'Complex queries and optimization' },
      { name: 'MongoDB', level: 80, description: 'NoSQL and document databases' },
      { name: 'MySQL', level: 82, description: 'Relational database design' },
      { name: 'Redis', level: 75, description: 'Caching and session management' },
      { name: 'Firebase', level: 78, description: 'Real-time database and auth' },
      { name: 'Prisma', level: 83, description: 'Modern database toolkit' },
    ],
    design: [
      { name: 'Figma', level: 85, description: 'UI/UX design and prototyping' },
      { name: 'Adobe XD', level: 75, description: 'Interactive design and wireframing' },
      { name: 'Sketch', level: 70, description: 'Digital design platform' },
      { name: 'Photoshop', level: 80, description: 'Image editing and manipulation' },
      { name: 'Illustrator', level: 72, description: 'Vector graphics and icons' },
      { name: 'Responsive Design', level: 90, description: 'Mobile-first design principles' },
    ],
    mobile: [
      { name: 'React Native', level: 80, description: 'Cross-platform mobile development' },
      { name: 'Flutter', level: 70, description: 'Google\'s UI toolkit' },
      { name: 'Swift', level: 65, description: 'iOS native development' },
      { name: 'Kotlin', level: 60, description: 'Android native development' },
      { name: 'Progressive Web Apps', level: 85, description: 'PWA development and deployment' },
      { name: 'Mobile UI/UX', level: 82, description: 'Mobile-first design patterns' },
    ],
    tools: [
      { name: 'Git/GitHub', level: 90, description: 'Version control and collaboration' },
      { name: 'Docker', level: 75, description: 'Containerization and deployment' },
      { name: 'AWS', level: 78, description: 'Cloud services and deployment' },
      { name: 'CI/CD', level: 82, description: 'Continuous integration and deployment' },
      { name: 'Webpack/Vite', level: 85, description: 'Build tools and bundling' },
      { name: 'Testing', level: 80, description: 'Jest, Cypress, and testing strategies' },
    ],
  };

  const currentSkills = skills[activeCategory as keyof typeof skills];

  const getLevelColor = (level: number) => {
    if (level >= 85) return 'bg-green-500';
    if (level >= 75) return 'bg-blue-500';
    if (level >= 65) return 'bg-yellow-500';
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
            Comprehensive skill set covering modern web development technologies and tools.
          </p>
        </div>

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
                <Icon size={20} />
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {currentSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{skill.name}</h3>
                  <p className="text-gray-600 text-sm">{skill.description}</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">{skill.level}%</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ease-out ${getLevelColor(skill.level)}`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Technologies Learned</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-lg text-blue-100 mb-4">
              Always learning and staying updated with the latest technologies and best practices.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Fast Learner', 'Problem Solver', 'Team Player', 'Detail Oriented', 'Creative Thinker'].map((trait) => (
                <span
                  key={trait}
                  className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;