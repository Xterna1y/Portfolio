import { useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'iot', label: 'IoT Systems' },
    { id: 'web', label: 'Web Development' },
    { id: 'simulation', label: 'Simulations' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Batuu Climbing Customer Portal',
      description:
        'Revamped the climbing gym’s customer web portal while at Sensoft Technologies. Improved UI/UX and implemented React-based routing and authentication.',
      image: '',
      technologies: ['React', 'TypeScript', 'CSS', 'REST API'],
      category: 'web',
      liveUrl: 'https://online.batuuclimbing.com/login',
      githubUrl: '',
      featured: true,
    },
    {
      id: 2,
      title: 'Smart Home System',
      description:
        'IoT-based home automation using Arduino and sensors for lighting and temperature control, demonstrating embedded programming and real-time monitoring.',
      image: '',
      technologies: ['Arduino', 'C', 'Sensors', 'IoT'],
      category: 'iot',
      liveUrl: '',
      githubUrl: '',
      featured: true,
    },
    {
      id: 3,
      title: 'Smart Intruder System',
      description:
        'Security IoT system that detects unauthorized motion using PIR sensors and triggers alarms, showcasing automation logic and sensor integration.',
      image: '',
      technologies: ['Arduino', 'C', 'Sensors', 'IoT'],
      category: 'iot',
      liveUrl: '',
      githubUrl: '',
      featured: false,
    },
    {
      id: 4,
      title: 'Smart Irrigation System',
      description:
        'Automated irrigation system that monitors soil moisture and activates watering mechanisms. Built using Arduino and humidity sensors.',
      image: '',
      technologies: ['Arduino', 'C', 'IoT', 'Moisture Sensors'],
      category: 'iot',
      liveUrl: '',
      githubUrl: '',
      featured: false,
    },
    {
      id: 5,
      title: 'Smart Fire Alarm System',
      description:
        'Developed a safety alert system using smoke sensors and a microcontroller to detect fire conditions and trigger audible warnings.',
      image: '',
      technologies: ['Arduino', 'C', 'IoT', 'Smoke Sensor'],
      category: 'iot',
      liveUrl: '',
      githubUrl: '',
      featured: false,
    },
    {
      id: 6,
      title: 'ATM Machine Simulator',
      description:
        'Simulated ATM operations with authentication, balance inquiry, and withdrawal functions using C programming and file handling.',
      image: '',
      technologies: ['C', 'File Handling', 'Logic Design'],
      category: 'simulation',
      liveUrl: '',
      githubUrl: '',
      featured: false,
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world web applications and IoT systems that combine creativity with technical depth.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{project.title.charAt(0)}</span>
                    </div>
                    <p className="text-gray-600">Project Preview</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      <Github size={18} />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <Filter size={18} />
              {filter.label}
            </button>
          ))}
        </div>

        {/* All Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{project.title.charAt(0)}</span>
                  </div>
                  <p className="text-gray-600 text-sm">Project</p>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors duration-200"
                    >
                      <ExternalLink size={14} />
                      Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  )}
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
