import { useState, useEffect, useRef } from 'react';

const About = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Check system preference or stored preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800'}`}>
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          DisasterAlert
        </div>
        <button 
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <h1 className="text-3xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Predicting Disasters, Protecting Lives
          </h1>
          
          <p className="text-xl max-w-2xl mx-auto mb-10">
            We leverage cutting-edge AI technology to provide early warnings for natural disasters, helping communities prepare and respond effectively.
          </p>
          <div className="h-64 w-full rounded-xl overflow-hidden relative">
            <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-400 to-purple-400'} flex items-center justify-center`}>
              <div className="text-center p-8">
                <h2 className="text-3xl font-bold mb-4">Visualizing a Safer Future</h2>
                <p>Advanced satellite imagery analysis and predictive modeling</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <div className={`p-8 rounded-2xl shadow-xl transform transition-all duration-700 hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p>To harness the power of artificial intelligence and data science to predict natural disasters with unprecedented accuracy, providing critical early warnings that save lives and reduce economic impact.</p>
          </div>
          
          <div className={`p-8 rounded-2xl shadow-xl transform transition-all duration-700 hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-4xl mb-4">🔭</div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p>A world where communities are resilient to natural disasters through advanced predictive technology, enabling timely evacuations and preparations that minimize human suffering.</p>
          </div>
        </section>

        {/* Technologies */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Technologies We Use</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['React', 'FastAPI', 'TensorFlow', 'PostgreSQL', 'Docker', 'AWS', 'TailwindCSS', 'PyTorch'].map((tech, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg text-center transform transition-all duration-500 hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
              >
                <div className="text-2xl mb-2">{getTechIcon(tech)}</div>
                <h3 className="font-semibold">{tech}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard 
                key={index} 
                member={member} 
                darkMode={darkMode} 
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className={`p-8 rounded-2xl mb-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard number={25000} label="Predictions Made" darkMode={darkMode} />
            <StatCard number={94} label="Accuracy Rate (%)" darkMode={darkMode} />
            <StatCard number={18} label="Countries Covered" darkMode={darkMode} />
            <StatCard number={120} label="Lives Saved" darkMode={darkMode} />
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-2xl text-center transform transition-all duration-500 hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl max-w-4xl mx-auto`}>
          <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
          <ContactForm darkMode={darkMode} />
        </section>
      </div>

      {/* Footer */}
      <footer className={`mt-20 py-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-2xl hover:text-blue-500 transition-colors">GitHub</a>
          <a href="#" className="text-2xl hover:text-blue-500 transition-colors">LinkedIn</a>
          <a href="#" className="text-2xl hover:text-blue-500 transition-colors">Twitter</a>
        </div>
        <p>© {new Date().getFullYear()} DisasterPredict. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Team Member Card with Animation
const TeamMemberCard = ({ member, darkMode, index }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`p-6 rounded-2xl text-center transform transition-all duration-1000 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative mb-4 h-40 w-40 mx-auto">
        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-transparent animate-border-pulse">
          <div className={`h-full w-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <span className="text-4xl">👤</span>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold">{member.name}</h3>
      <p className="text-blue-500 mb-2">{member.role}</p>
      <p className="text-sm">{member.bio}</p>
    </div>
  );
};

// Stat Card with Counter Animation
const StatCard = ({ number, label, darkMode }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = number;
          const duration = 2000;
          const increment = end / (duration / 20);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 20);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [number]);

  return (
    <div 
      ref={cardRef}
      className={`p-6 rounded-2xl text-center transform transition-all duration-500 hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} shadow-md`}
    >
      <div className="text-4xl font-bold text-blue-500 mb-2">{count}+</div>
      <div className="font-semibold">{label}</div>
    </div>
  );
};

// Contact Form
const ContactForm = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    queryType: 'Feedback'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Form submitted! (This is a demo)');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          required
        />
      </div>
      
      <div>
        <label htmlFor="queryType" className="block mb-2 font-medium">Query Type</label>
        <select
          id="queryType"
          name="queryType"
          value={formData.queryType}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
        >
          <option value="Feedback">Feedback</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Collaboration">Collaboration</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block mb-2 font-medium">Message</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          required
        ></textarea>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transform hover:scale-105 transition-transform"
      >
        Send Message
      </button>
      
      <p className="text-sm text-center text-gray-500 mt-4">
        We'll respond to your inquiry within 24-48 hours.
      </p>
    </form>
  );
};

// Helper functions
const getTechIcon = (tech) => {
  const icons = {
    'React': '⚛️',
    'FastAPI': '🚀',
    'TensorFlow': '🤖',
    'PostgreSQL': '🐘',
    'Docker': '🐳',
    'AWS': '☁️',
    'TailwindCSS': '💨',
    'PyTorch': '🔥'
  };
  return icons[tech] || '💻';
};

// Data
const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'Lead Data Scientist',
    bio: 'Expert in machine learning models for natural disaster prediction with 10+ years of experience.'
  },
  {
    name: 'Maria Rodriguez',
    role: 'Frontend Developer',
    bio: 'Specializes in creating intuitive user interfaces for complex data visualization.'
  },
  {
    name: 'David Kim',
    role: 'Backend Engineer',
    bio: 'Designs robust and scalable API systems to handle real-time data processing.'
  },
  {
    name: 'Sarah Chen',
    role: 'DevOps Specialist',
    bio: 'Ensures seamless deployment and monitoring of our prediction systems.'
  }
];

const steps = [
  {
    icon: '📡',
    title: 'Data Collection',
    description: 'Gather real-time data from satellites, sensors, and historical databases.'
  },
  {
    icon: '🧠',
    title: 'AI Analysis',
    description: 'Our models process the data to identify patterns and predict potential disasters.'
  },
  {
    icon: '⚠️',
    title: 'Early Alerts',
    description: 'Generate and send timely warnings to authorities and communities at risk.'
  },
  {
    icon: '📊',
    title: 'Response Management',
    description: 'Provide tools and data to help coordinate effective disaster response efforts.'
  }
];

// Add custom CSS for animations
const styles = `
  @keyframes border-pulse {
    0% { border-color: rgba(59, 130, 246, 0.5); }
    50% { border-color: rgba(168, 85, 247, 0.8); }
    100% { border-color: rgba(59, 130, 246, 0.5); }
  }
  
  .animate-border-pulse {
    animation: border-pulse 3s infinite;
  }
  
  .hover-float:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
  }
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

export default About;