
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import AdPlaceholder from './AdPlaceholder';

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Word Counter', path: '/word-counter' },
    { name: 'Image Pro', path: '/image-compressor' },
    { name: 'Secure Pass', path: '/password-generator' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary-500/30">
      <header className="sticky top-0 z-[60] bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-tr from-primary-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-[15deg] transition-all duration-500">
              <i className="fas fa-layer-group text-2xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                TOOLS<span className="text-primary-600">HUB</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">Enterprise</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
                  location.pathname === link.path 
                    ? 'bg-primary-500/10 text-primary-600' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-4"></div>
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars-staggered'}`}></i>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 animate-in slide-in-from-top-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-4 rounded-2xl font-bold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-9">
            {children}
            <div className="mt-20">
              <AdPlaceholder type="content" />
            </div>
          </div>
          <aside className="hidden lg:block lg:col-span-3">
             <div className="sticky top-32 space-y-8">
               <AdPlaceholder type="sidebar" />
               <div className="p-8 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-[2rem] text-white shadow-2xl">
                 <h4 className="font-black text-xl mb-4">Pro Privacy</h4>
                 <p className="text-sm text-primary-100 leading-relaxed mb-6">Your data is processed 100% locally. We never store or see your content.</p>
                 <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                   <i className="fas fa-user-shield"></i>
                 </div>
               </div>
             </div>
          </aside>
        </div>
      </main>

      <footer className="bg-slate-950 text-white py-20 mt-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                  <i className="fas fa-layer-group"></i>
                </div>
                <span className="text-2xl font-black tracking-tighter">TOOLSHUB</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-10 leading-relaxed text-lg">
                The world's most advanced web utilities, optimized for speed and human privacy.
              </p>
              <div className="flex gap-4">
                {['facebook-f', 'twitter', 'linkedin-in', 'github'].map(icon => (
                  <a key={icon} href="#" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center hover:bg-primary-600 transition-all text-slate-400 hover:text-white border border-slate-800">
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            {['Services', 'Resources'].map((title, i) => (
              <div key={title}>
                <h5 className="font-bold mb-8 uppercase text-xs tracking-widest text-slate-500">{title}</h5>
                <ul className="space-y-4 text-slate-400 font-medium">
                  <li><Link to="/" className="hover:text-primary-400 transition-colors">Documentation</Link></li>
                  <li><Link to="/about" className="hover:text-primary-400 transition-colors">API Status</Link></li>
                  <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
                  <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Changelog</Link></li>
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>&copy; 2024 ToolsHub International. All rights protected.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/disclaimer" className="hover:text-white transition-colors">Cookies</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
