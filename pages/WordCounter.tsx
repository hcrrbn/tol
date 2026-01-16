
import React, { useState, useEffect } from 'react';
import Toast from '../components/Toast';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [stats, setStats] = useState({
    words: 0,
    chars: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });

  useEffect(() => {
    document.title = "Professional Word Counter - Analyze Text Online";
  }, []);

  useEffect(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    setStats({
      words,
      chars: text.length,
      sentences: trimmed ? text.split(/[.!?]+/).filter(Boolean).length : 0,
      paragraphs: trimmed ? text.split(/\n+/).filter(Boolean).length : 0,
      readingTime: Math.ceil(words / 200)
    });
  }, [text]);

  const transform = (type: 'upper' | 'lower' | 'title') => {
    if (type === 'upper') setText(text.toUpperCase());
    if (type === 'lower') setText(text.toLowerCase());
    if (type === 'title') {
      setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setToast('Text copied to clipboard!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Word Counter <span className="text-primary-600">Pro</span></h1>
          <p className="text-slate-500 dark:text-slate-400">Deep text analysis and formatting utilities.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => transform('upper')} className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:border-primary-500 transition-colors">UPPER</button>
          <button onClick={() => transform('lower')} className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:border-primary-500 transition-colors">lower</button>
          <button onClick={() => transform('title')} className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:border-primary-500 transition-colors">Title Case</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Words', value: stats.words, color: 'text-blue-600' },
          { label: 'Characters', value: stats.chars, color: 'text-emerald-600' },
          { label: 'Sentences', value: stats.sentences, color: 'text-amber-600' },
          { label: 'Paragraphs', value: stats.paragraphs, color: 'text-rose-600' },
          { label: 'Read Time', value: `${stats.readingTime}m`, color: 'text-indigo-600' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
            <div className={`text-3xl font-black ${item.color}`}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content..."
          className="w-full h-[450px] p-8 bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none transition-all shadow-xl shadow-black/5 text-lg leading-relaxed dark:text-slate-200"
        ></textarea>
        
        <div className="absolute top-6 right-6 flex space-x-2">
           <button onClick={copyText} className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-primary-600 hover:text-white transition-all shadow-sm">
             <i className="fas fa-copy"></i>
           </button>
           <button onClick={() => setText('')} className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
             <i className="fas fa-trash-alt"></i>
           </button>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-3xl p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center"><i className="fas fa-chart-pie mr-3 text-primary-400"></i> Keyword Density</h3>
        {stats.words > 0 ? (
          <div className="flex flex-wrap gap-3">
            {Object.entries(
              text.toLowerCase().match(/\b(\w+)\b/g)?.reduce((acc: any, word) => {
                if (word.length > 3) acc[word] = (acc[word] || 0) + 1;
                return acc;
              }, {}) || {}
            )
              .sort((a: any, b: any) => b[1] - a[1])
              .slice(0, 10)
              .map(([word, count]: any) => (
                <div key={word} className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700 flex items-center space-x-3">
                  <span className="font-bold">{word}</span>
                  <span className="text-xs text-primary-400 px-2 py-0.5 bg-primary-500/10 rounded-full">{count}</span>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-slate-500 italic text-sm">Type something to see keyword analysis...</p>
        )}
      </div>
    </div>
  );
};

export default WordCounter;
