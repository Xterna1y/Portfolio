import { useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const featuredProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management and payment processing.',
      image: '/api/placeholder/640/480',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://demo-ecommerce.reo.dev',
      githubUrl: 'https://github.com/reo/ecommerce-platform',
      featured: true,
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team collaboration.',
      image: '/api/placeholder/640/480',
      technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
      liveUrl: 'https://demo-tasks.reo.dev',
      githubUrl: 'https://github.com/reo/task-manager',
      featured: true,
    },
  ];

  const allProjects = [
    ...featuredProjects,
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Real-time weather monitoring dashboard with data visualization.',
      image: '/api/placeholder/640/480',
      technologies: ['React', 'Chart.js', 'OpenWeather API'],
      liveUrl: 'https://weather.reo.dev',
      githubUrl: 'https://github.com/reo/weather-dashboard',
      featured: false,
    },
    {
      id: 4,
      title: 'Blog Platform',
      description: 'Content management system with markdown support and SEO optimization.',
      image: '/api/placeholder/640/480',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'Vercel'],
      liveUrl: 'https://blog.reo.dev',
      githubUrl: 'https://github.com/reo/blog-platform',
      featured: false,
    },
    {
      id: 5,
      title: 'Chat Application',
      description: 'Real-time chat application with end-to-end encryption.',
      image: '/api/placeholder/640/480',
      technologies: ['React', 'Socket.io', 'Redis', 'JWT'],
      liveUrl: 'https://chat.reo.dev',
      githubUrl: 'https://github.com/reo/chat-app',
      featured: false,
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Personal portfolio website with modern design and animations.',
      image: '/api/placeholder/640/480',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://reo.dev',
      githubUrl: 'https://github.com/reo/portfolio',
      featured: false,
    },
  ];

  const categories = ['all', 'frontend', 'backend', 'fullstack', 'mobile'];
  
  const filteredProjects = activeFilter === 'all' 
    ? allProjects 
    : allProjects.filter(project => {
        if (activeFilter === 'frontend') {
          return project.technologies.some(tech => 
            ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS'].includes(tech)
          );
        }
        if (activeFilter === 'backend') {
          return project.technologies.some(tech => 
            ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'Socket.io', 'Redis', 'JWT'].includes(tech)
          );
        }
        if (activeFilter === 'fullstack') {
          return project.technologies.some(tech => 
            ['React', 'Node.js', 'Vue.js', 'Express', 'Next.js', 'TypeScript'].includes(tech)
          );
        }
        if (activeFilter === 'mobile') {
          return project.technologies.some(tech => 
            ['React Native', 'Flutter', 'Swift', 'Kotlin'].includes(tech)
          );
        }
        return true;
      });

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A selection of my recent work and personal projects
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-blue-600 font-bold text-lg">
                    <Filter size={48} />
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeFilter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <Filter size={16} />
              {category === 'all' ? 'All Projects' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-blue-600">
                  <Filter size={32} />
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {project.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-1 border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;