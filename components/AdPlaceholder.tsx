
import React from 'react';

interface AdPlaceholderProps {
  type: 'header' | 'sidebar' | 'content' | 'footer';
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type }) => {
  const styles = {
    header: "w-full h-24 flex items-center justify-center text-slate-400 text-xs italic",
    sidebar: "w-full h-[600px] bg-slate-50 dark:bg-slate-900/50 rounded flex items-center justify-center text-slate-400 text-xs italic border border-dashed border-slate-300 dark:border-slate-700",
    content: "w-full h-64 bg-slate-50 dark:bg-slate-900/50 rounded-xl my-8 flex items-center justify-center text-slate-400 text-xs italic border border-dashed border-slate-300 dark:border-slate-700",
    footer: "text-slate-500 text-xs",
  };

  if (type === 'footer') {
    return (
      <div className={styles.footer}>
        {/* Google AdSense Ad Here */}
        <span>Partner Advertisements</span>
      </div>
    );
  }

  return (
    <div className={styles[type]}>
      <div className="text-center">
        {/* Google AdSense Ad Content */}
        <p className="mb-1 uppercase font-bold tracking-widest opacity-50">Advertisement</p>
        <p className="text-[10px] opacity-40">Place your AdSense code here</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;
