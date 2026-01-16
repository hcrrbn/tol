
import React, { useState, useEffect } from 'react';

const AgeCalculator: React.FC = () => {
  const [dob, setDob] = useState('');
  const [data, setData] = useState<any>(null);

  const getZodiac = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: 'Aries', icon: 'fa-aries' };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: 'Taurus', icon: 'fa-taurus' };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: 'Gemini', icon: 'fa-gemini' };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: 'Cancer', icon: 'fa-cancer' };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: 'Leo', icon: 'fa-leo' };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: 'Virgo', icon: 'fa-virgo' };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: 'Libra', icon: 'fa-libra' };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: 'Scorpio', icon: 'fa-scorpio' };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: 'Sagittarius', icon: 'fa-sagittarius' };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: 'Capricorn', icon: 'fa-capricorn' };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: 'Aquarius', icon: 'fa-aquarius' };
    return { sign: 'Pisces', icon: 'fa-pisces' };
  };

  const calculate = () => {
    if (!dob) return;
    const b = new Date(dob);
    const now = new Date();
    const diff = now.getTime() - b.getTime();

    const years = now.getFullYear() - b.getFullYear();
    const months = (years * 12) + (now.getMonth() - b.getMonth());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const hours = Math.floor(diff / (1000 * 60 * 60));

    setData({
      years: Math.floor(days / 365.25),
      months,
      days,
      weeks,
      hours,
      zodiac: getZodiac(b)
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="text-center">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Life <span className="text-primary-600">Insights</span></h1>
        <p className="text-slate-500 dark:text-slate-400">Discover your journey through time.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-2xl shadow-black/5 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <label className="block text-sm font-black uppercase tracking-widest text-slate-400">Select Birth Date</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl text-2xl text-center focus:ring-4 ring-primary-500/10 transition-all outline-none"
          />
          <button onClick={calculate} className="w-full py-5 bg-primary-600 text-white rounded-3xl font-black text-lg hover:bg-primary-700 shadow-xl shadow-primary-500/20 active:scale-95 transition-all">
            Calculate Insights
          </button>
        </div>

        {data && (
          <div className="mt-16 animate-in zoom-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem]">
                <div className="text-5xl font-black text-primary-600 mb-2">{data.years}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Solar Years</div>
              </div>
              <div className="p-8 bg-primary-600 text-white rounded-[2rem] transform scale-110 shadow-2xl">
                <div className="text-2xl font-bold mb-4">Zodiac Sign</div>
                <i className={`fas ${data.zodiac.icon} text-6xl mb-4`}></i>
                <div className="text-3xl font-black">{data.zodiac.sign}</div>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem]">
                <div className="text-5xl font-black text-indigo-600 mb-2">{data.months}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Lunar Cycles</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Weeks', val: data.weeks.toLocaleString() },
                { label: 'Total Days', val: data.days.toLocaleString() },
                { label: 'Total Hours', val: data.hours.toLocaleString() },
                { label: 'Next Birthday', val: 'Soon' },
              ].map((item, idx) => (
                <div key={idx} className="p-6 border border-slate-100 dark:border-slate-700 rounded-3xl">
                  <div className="text-lg font-black text-slate-900 dark:text-white">{item.val}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;
