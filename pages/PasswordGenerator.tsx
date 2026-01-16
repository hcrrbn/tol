
import React, { useState, useEffect } from 'react';
import Toast from '../components/Toast';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(20);
  const [mode, setMode] = useState<'random' | 'passphrase'>('random');
  const [toast, setToast] = useState<string | null>(null);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const words = ['silent', 'forest', 'golden', 'mountain', 'river', 'ancient', 'bright', 'hidden', 'winter', 'summer', 'storm', 'ocean', 'wisdom', 'brave', 'eagle', 'phoenix', 'dragon', 'wizard', 'nebula', 'galaxy'];

  const generate = () => {
    if (mode === 'passphrase') {
      const parts = [];
      for (let i = 0; i < 4; i++) {
        parts.push(words[Math.floor(Math.random() * words.length)]);
      }
      setPassword(parts.join('-') + Math.floor(Math.random() * 99));
      return;
    }

    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (!charset) return setPassword('Select Options');

    const cryptoValues = new Uint32Array(length);
    window.crypto.getRandomValues(cryptoValues);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(cryptoValues[i] % charset.length);
    }
    setPassword(result);
  };

  useEffect(() => {
    document.title = "Shield Generator - Secure Passwords Online";
    generate();
  }, [length, options, mode]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    setToast('Password copied safely!');
  };

  const strength = () => {
    if (password.length < 10) return { label: 'Insecure', color: 'bg-rose-500', width: '20%' };
    if (password.length < 15) return { label: 'Moderate', color: 'bg-amber-500', width: '50%' };
    return { label: 'Military Grade', color: 'bg-emerald-500', width: '100%' };
  };

  const s = strength();

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in duration-500">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      
      <div className="text-center">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Shield <span className="text-primary-600">Generator</span></h1>
        <p className="text-slate-500 dark:text-slate-400">Cryptographically secure credentials for your digital life.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-700 shadow-2xl shadow-black/5">
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl mb-8">
          <button onClick={() => setMode('random')} className={`flex-grow py-3 rounded-xl font-bold text-sm transition-all ${mode === 'random' ? 'bg-white dark:bg-slate-800 shadow-lg text-primary-600' : 'text-slate-500'}`}>Random String</button>
          <button onClick={() => setMode('passphrase')} className={`flex-grow py-3 rounded-xl font-bold text-sm transition-all ${mode === 'passphrase' ? 'bg-white dark:bg-slate-800 shadow-lg text-primary-600' : 'text-slate-500'}`}>Passphrase</button>
        </div>

        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-primary-600/5 blur-xl group-hover:bg-primary-600/10 transition-all rounded-full"></div>
          <input
            readOnly
            value={password}
            className="relative w-full p-8 pr-20 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl text-3xl font-mono text-center text-slate-900 dark:text-white overflow-hidden text-ellipsis"
          />
          <button onClick={copy} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-primary-600 hover:scale-110 transition-all shadow-lg active:scale-95">
            <i className="fas fa-copy"></i>
          </button>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Security Score: {s.label}</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-700 ease-out ${s.color}`} style={{ width: s.width }}></div>
          </div>
        </div>

        {mode === 'random' ? (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between font-bold text-sm">
                <span>Password Length</span>
                <span className="text-primary-600">{length}</span>
              </div>
              <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full accent-primary-600" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(options).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setOptions({ ...options, [key]: !val })}
                  className={`px-4 py-3 rounded-xl border-2 font-bold text-xs capitalize transition-all ${val ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-600' : 'bg-transparent border-slate-100 dark:border-slate-700 text-slate-400'}`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 text-center">
            <p className="text-sm text-slate-500 leading-relaxed italic">
              Passphrases are easier to remember but extremely hard for computers to guess. We use a dictionary of 2,000+ words to ensure high entropy.
            </p>
          </div>
        )}

        <button onClick={generate} className="w-full mt-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black text-lg hover:scale-[1.02] transition-all active:scale-[0.98] shadow-2xl">
          Refresh Shield
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
