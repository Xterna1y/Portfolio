import { useState } from 'react';
import { User, Code, Target, Award } from 'lucide-react';

// ------------------ TYPES ------------------
type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  description: string;
};

type SkillItem = {
  name: string;
  level: number;
};

type TabContentType =
  | { title: string; items: ExperienceItem[] }
  | { title: string; items: SkillItem[] }
  | { title: string; items: string[] };

// ------------------ COMPONENT ------------------
const About = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'skills' | 'goals' | 'achievements'>('experience');

  const tabs = [
    { id: 'experience', label: 'Experience', icon: User },
    { id: 'skills', label: 'Core Skills', icon: Code },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'achievements', label: 'Achievements', icon: Award },
  ];

  const tabContent: Record<'experience' | 'skills' | 'goals' | 'achievements', TabContentType> = {
    experience: {
      title: 'Professional Experience',
      items: [
        {
          title: 'Contract Software Engineer',
          company: 'Sensoft Technologies',
          period: 'Nov 2024 - Jan 2025',
          description: 'Mainly in charge of revamping web applications using React, TypeScript, and modern CSS frameworks.'
        },
        {
          title: 'IT Infrastructure Intern',
          company: 'UOB KayHian Securities',
          period: 'June 2024 - Aug 2024',
          description: 'Tasked for troubleshooting and network set up'
        },
        {
          title: 'Indoor Rock Climbing Instructor',
          company: 'HangOut Climbing Gym',
          period: '2019 - 2024',
          description: 'Worked as store-in-charge as well as instructor'
        }
      ]
    },
    skills: {
      title: 'Technical Expertise',
      items: [
        { name: 'React/Next.js', level: 70 },
        { name: 'TypeScript', level: 70 },
        { name: 'Node.js/Express', level: 40 },
        { name: 'Tailwind CSS', level: 70 },
        { name: 'Python', level: 70 },
        { name: 'Database Design', level: 80 },
        { name: 'C', level: 80 },
        { name: 'HTML', level: 80 },
        { name: 'Arduino', level: 80 },
      ]
    },
    goals: {
      title: 'Career Goals',
      items: [
        'Become a technical lead at a product-focused company',
        'Contribute to open-source projects regularly',
        'Mentor junior developers and share knowledge',
        'Build products that impact millions of users',
        'Stay current with emerging technologies'
      ]
    },
    achievements: {
      title: 'Key Achievements',
      items: [
        'Led a team that planned for college Prom Night',
        'Made a Smart Home System simulation',
        'Made a Smart Irrigation System simulation',
        'Made a Smart Intruder Detection System simulation',
        'For my diploma FYP made a Smart Vehicle Entry System with Facial Recogition and License Plate Recognition'
      ]
    }
  };

  // ------------------ RENDER ------------------
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
           I am an aspiring software engineer with strong academic acheivements, international exposure and diverse extracurricular leadership experience.
           Seekig to leverage my technical skills and cross-cultural background to grow in dynamic and innovative environment and looking to improve upon my current self.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SECTION */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">My Story</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                I started my journey in web development over 4 years ago, driven by curiosity about how things work on the internet. 
                What began as a hobby quickly turned into a passion as I discovered the power of code to create meaningful experiences.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, I specialize in building scalable, user-friendly applications that solve real-world problems. 
                I believe in writing clean, maintainable code and creating interfaces that delight users.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
                <div className="text-gray-700">Years Experience</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-gray-700">Projects Completed</div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
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

            {/* TAB CONTENT */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {tabContent[activeTab].title}
              </h3>

              {activeTab === 'skills' ? (
                // Skills progress bars
                <div className="space-y-4">
                  {(tabContent.skills.items as SkillItem[]).map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-gray-600">{skill.level}%</span>
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
              ) : (
                // Other tabs (experience, goals, achievements)
                <div className="space-y-4">
                  {(tabContent[activeTab].items as (ExperienceItem | string)[]).map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4">
                      {typeof item === 'string' ? (
                        <p className="text-gray-700">{item}</p>
                      ) : (
                        <div>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          <p className="text-blue-600 font-medium">
                            {item.company} • {item.period}
                          </p>
                          <p className="text-gray-700 mt-1">{item.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
