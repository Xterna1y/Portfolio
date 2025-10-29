import { useState } from 'react';
import { User, Award, Target, Code, Briefcase } from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');

  const skills = {
    frontend: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'Vue.js', level: 70 },
    ],
    backend: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MongoDB', level: 70 },
    ],
    tools: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Vite', level: 85 },
    ],
  };

  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc',
      period: '2021 - Present',
      description: 'Leading development of enterprise web applications with React, Node.js, and cloud technologies.',
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Agency',
      period: '2019 - 2021',
      description: 'Built responsive websites and web applications for various clients using modern JavaScript frameworks.',
    },
    {
      title: 'Frontend Developer',
      company: 'Creative Studio',
      period: '2017 - 2019',
      description: 'Specialized in React development and UI/UX design for startup projects.',
    },
  ];

  const tabs = [
    { id: 'story', label: 'My Story', icon: User },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate developer with expertise in modern web technologies
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-50 p-6 rounded-2xl">
          {activeTab === 'story' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">My Journey</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">4+</div>
                  <div className="text-gray-700">Years Experience</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                  <div className="text-gray-700">Projects Completed</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
                  <div className="text-gray-700">Happy Clients</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">12+</div>
                  <div className="text-gray-700">Technologies</div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">What I Do</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Code className="text-blue-600 mt-1" size={20} />
                    <div>
                      <div className="font-bold text-gray-900">Frontend Development</div>
                      <div className="text-gray-600 text-sm">Creating beautiful, responsive user interfaces</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="text-blue-600 mt-1" size={20} />
                    <div>
                      <div className="font-bold text-gray-900">Backend Development</div>
                      <div className="text-gray-600 text-sm">Building robust server-side applications</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Skills</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h4 className="text-lg font-bold text-gray-900 mb-4 capitalize">
                      {category}
                    </h4>
                    <div className="space-y-3">
                      {skillList.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700 font-medium">{skill.name}</span>
                            <span className="text-blue-600 font-bold">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Work Experience</h3>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4">
                    <div className="font-bold text-gray-900">{job.title}</div>
                    <div className="text-blue-600 font-medium">{job.company}</div>
                    <div className="text-blue-600 font-medium">{job.period}</div>
                    <div className="text-gray-700 mt-1">{job.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;