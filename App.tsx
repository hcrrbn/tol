
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WordCounter from './pages/WordCounter';
import ImageCompressor from './pages/ImageCompressor';
import PasswordGenerator from './pages/PasswordGenerator';
import AgeCalculator from './pages/AgeCalculator';
import TextToSpeech from './pages/TextToSpeech';
import StaticPages from './pages/StaticPages';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/word-counter" element={<WordCounter />} />
          <Route path="/image-compressor" element={<ImageCompressor />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          <Route path="/about" element={<StaticPages type="about" />} />
          <Route path="/privacy" element={<StaticPages type="privacy" />} />
          <Route path="/disclaimer" element={<StaticPages type="disclaimer" />} />
          <Route path="/contact" element={<StaticPages type="contact" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

// Helper component to scroll to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default App;
