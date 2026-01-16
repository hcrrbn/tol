
import React, { useState, useEffect, useRef } from 'react';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    document.title = "Text to Speech - Free Online Tools Hub";
    synth.current = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.current?.getVoices() || [];
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [selectedVoice]);

  const speak = () => {
    if (synth.current?.speaking) synth.current.cancel();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    synth.current?.speak(utterance);
  };

  const stop = () => {
    synth.current?.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Text to Speech</h1>
        <p className="text-slate-600 dark:text-slate-400">Transform your written text into professional narration.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here to hear it read aloud..."
          className="w-full h-48 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500 outline-none transition-all shadow-inner text-lg dark:text-white"
        ></textarea>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Voice Selection</label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 dark:text-white outline-none"
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
             <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Speed: {rate}x</label>
             </div>
             <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
             />
          </div>

          <div className="space-y-2">
             <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Pitch: {pitch}</label>
             </div>
             <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
             />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
          <button
            onClick={speak}
            disabled={!text}
            className="flex-grow py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <i className={`fas ${isSpeaking ? 'fa-volume-high animate-pulse' : 'fa-play'}`}></i>
            <span>{isSpeaking ? 'Now Reading...' : 'Read Aloud'}</span>
          </button>
          <button
            onClick={stop}
            className="px-10 py-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center space-x-2"
          >
            <i className="fas fa-stop"></i>
            <span>Stop</span>
          </button>
        </div>
      </div>
      
      <div className="bg-primary-50 dark:bg-primary-900/10 p-6 rounded-2xl border border-primary-100 dark:border-primary-900/20 flex flex-col md:flex-row items-center gap-6">
         <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary-600 shadow-sm flex-shrink-0">
            <i className="fas fa-headphones text-2xl"></i>
         </div>
         <p className="text-slate-600 dark:text-slate-400 text-sm">
            Uses your browser's native Speech Synthesis capabilities. Voices available vary based on your operating system and browser (Chrome, Safari, Edge have the best selections).
         </p>
      </div>
    </div>
  );
};

export default TextToSpeech;
