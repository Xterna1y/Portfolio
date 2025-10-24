import { useState } from 'react';
import { Code, Cpu, Database, Network, Languages, Globe } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('programming');

  const categories = [
    { id: 'programming', label: 'Programming', icon: Code },
    { id: 'iot', label: 'IoT & Embedded Systems', icon: Cpu },
    { id: 'frontend', label: 'Frontend', icon: Globe },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'languages', label: 'Languages', icon: Languages },
    { id: 'softskills', label: 'Soft Skills', icon: Network },
  ];

  const skills = {
    programming: [
      { name: 'C', level: 90, description: 'Advanced — core focus in logic, memory, and algorithms' },
      { name: 'Python', level: 80, description: 'Intermediate — scripting, automation, and data handling' },
      { name: 'React', level: 75, description: 'Intermediate — component design and state management' },
      { name: 'Arduino', level: 80, description: 'Intermediate — IoT device programming and prototyping' },
      { name: 'Kotlin', level: 60, description: 'Beginner — Android app fundamentals' },
      { name: 'SQL', level: 65, description: 'Basic — query design and relational structure' },
    ],
    iot: [
      { name: 'Smart Home System', level: 85, description: 'IoT system integrating sensors and automation' },
      { name: 'Smart Intruder System', level: 80, description: 'Security-based IoT alarm system' },
      { name: 'Smart Irrigation System', level: 78, description: 'Automated watering system using sensors' },
      { name: 'Smart Fire Alarm System', level: 82, description: 'Real-time detection and alert system' },
      { name: 'ATM Simulator', level: 70, description: 'Simulation system for transaction logic' },
    ],
    frontend: [
      { name: 'HTML', level: 90, description: 'Advanced — semantic structure and accessibility' },
      { name: 'CSS', level: 70, description: 'Beginner — layout design and styling' },
      { name: 'JavaScript', level: 75, description: 'Intermediate — DOM manipulation and interactivity' },
      { name: 'React.js', level: 75, description: 'Intermediate — functional components and hooks' },
    ],
    database: [
      { name: 'SQL', level: 65, description: 'Basic database design and queries' },
      { name: 'Firebase', level: 60, description: 'Basic cloud-based storage and authentication' },
    ],
    languages: [
      { name: 'English', level: 100, description: 'Fluent' },
      { name: 'Bahasa Melayu', level: 100, description: 'Fluent' },
      { name: 'Mandarin', level: 100, description: 'Fluent' },
      { name: 'Japanese', level: 60, description: 'Basic' },
      { name: 'French', level: 40, description: 'Beginner' },
    ],
    softskills: [
      { name: 'Leadership', level: 85, description: 'Led extracurricular and academic projects effectively' },
      { name: 'Adaptability', level: 90, description: 'Thrived across multicultural environments (Malaysia, Japan)' },
      { name: 'Team Collaboration', level: 88, description: 'Worked cross-functionally in software projects' },
      { name: 'Problem Solving', level: 92, description: 'Analytical and creative approach to challenges' },
      { name: 'Communication', level: 95, description: 'Multilingual with excellent technical articulation' },
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
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Technical & Professional Skills</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A blend of software engineering, IoT innovation, and multilingual communication expertise.
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
              <div className="text-4xl font-bold mb-2">8+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4+</div>
              <div className="text-blue-100">Years of Technical Learning</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-blue-100">Professional Roles</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-blue-100 mb-4">
              Continuously growing through hands-on projects and global collaboration.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Adaptable', 'Multilingual', 'Analytical Thinker', 'Collaborative', 'Innovative'].map((trait) => (
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
