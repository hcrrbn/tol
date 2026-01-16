
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';

const tools: Tool[] = [
  {
    id: 'word-counter',
    name: 'Word Counter Pro',
    description: 'Advanced text analysis with keyword density and case conversion.',
    icon: 'fa-file-lines',
    path: '/word-counter',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'image-compressor',
    name: 'Image Optimizer',
    description: 'Ultra-fast local compression with dimension and quality control.',
    icon: 'fa-image',
    path: '/image-compressor',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'password-generator',
    name: 'Shield Generator',
    description: 'Secure passphrases and cryptographic-grade password generation.',
    icon: 'fa-shield-halved',
    path: '/password-generator',
    color: 'from-amber-400 to-orange-600',
  },
  {
    id: 'age-calculator',
    name: 'Life Insights',
    description: 'Detailed age breakdown, zodiac info, and birthday countdowns.',
    icon: 'fa-calendar-check',
    path: '/age-calculator',
    color: 'from-rose-400 to-pink-600',
  },
  {
    id: 'text-to-speech',
    name: 'Studio Voice',
    description: 'Natural AI narration with advanced pitch and rate modulation.',
    icon: 'fa-waveform-lines',
    path: '/text-to-speech',
    color: 'from-violet-500 to-purple-700',
  },
];

const Home: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden rounded-3xl bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span>Next-Gen Web Utilities</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
            Everything you need. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">Completely Free.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional tools for creators, developers, and students. No uploads, no accounts, just pure browser-based power.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#tools-grid" className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl shadow-white/5 active:scale-95">
              Explore Tools
            </a>
            <Link to="/about" className="px-8 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all border border-slate-700">
              Why Us?
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <div id="tools-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 transition-all duration-500 hover:border-primary-500/50 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden"
          >
            <div className={`absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br ${tool.color} opacity-[0.03] group-hover:opacity-10 rounded-full transition-all duration-700 group-hover:scale-150`}></div>
            
            <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-black/5 group-hover:rotate-6 transition-all duration-500`}>
              <i className={`fas ${tool.icon} text-3xl`}></i>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {tool.name}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 h-12 overflow-hidden">
              {tool.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest group-hover:text-primary-500 transition-colors">Launch Tool</span>
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all">
                <i className="fas fa-chevron-right text-xs"></i>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Trust Bar */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center space-x-2 font-bold text-xl"><i className="fab fa-google"></i> <span>AdSense Ready</span></div>
          <div className="flex items-center space-x-2 font-bold text-xl"><i className="fas fa-bolt"></i> <span>Core Web Vitals</span></div>
          <div className="flex items-center space-x-2 font-bold text-xl"><i className="fas fa-lock"></i> <span>SSL Secure</span></div>
          <div className="flex items-center space-x-2 font-bold text-xl"><i className="fas fa-universal-access"></i> <span>Aria Compliant</span></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
