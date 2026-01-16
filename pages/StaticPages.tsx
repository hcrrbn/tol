
import React from 'react';

interface StaticPagesProps {
  type: 'about' | 'privacy' | 'disclaimer' | 'contact';
}

const StaticPages: React.FC<StaticPagesProps> = ({ type }) => {
  const content = {
    about: {
      title: "About Free Online Tools Hub",
      body: (
        <>
          <p>Welcome to <strong>ToolsHub</strong>, your primary destination for efficient, browser-based utilities. We believe that professional-grade tools should be accessible to everyone, for free, without the need for complex installations or invasive account signups.</p>
          <p>Our mission is to provide high-performance solutions for common tasks like image optimization, secure password generation, and content analysis while maintaining the highest standards of data privacy. Because all processing happens on your local machine, your data stays yours.</p>
        </>
      )
    },
    privacy: {
      title: "Privacy Policy",
      body: (
        <>
          <p>At ToolsHub, privacy isn't just a policy—it's how our apps are built. Most of our tools process your information directly in your browser using JavaScript. This means:</p>
          <ul>
            <li>Images you compress are never uploaded to a server.</li>
            <li>Passwords generated exist only on your screen.</li>
            <li>Text you count is not stored or logged.</li>
          </ul>
          <p>We use standard analytics and Google AdSense to maintain our servers, which may collect anonymous usage data via cookies.</p>
        </>
      )
    },
    disclaimer: {
      title: "Disclaimer",
      body: (
        <>
          <p>The information and tools provided on this website are for general informational purposes only. While we strive for 100% accuracy, ToolsHub cannot be held responsible for any data loss, security breaches on third-party platforms, or errors resulting from the use of our tools.</p>
          <p>Always verify critical calculations (like age for legal documents) with official sources.</p>
        </>
      )
    },
    contact: {
      title: "Contact Us",
      body: (
        <>
          <p>Have a suggestion for a new tool? Found a bug? We'd love to hear from you!</p>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mt-6">
             <p className="font-bold mb-2">Email Support:</p>
             <a href="mailto:support@toolshub.com" className="text-primary-600 text-xl font-mono">support@toolshub.com</a>
          </div>
          <p className="mt-4 text-sm text-slate-500">We typically respond to inquiries within 48 business hours.</p>
        </>
      )
    }
  };

  const { title, body } = content[type];

  return (
    <div className="max-w-3xl mx-auto py-12 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-3xl font-extrabold mb-8">{title}</h1>
        {body}
      </div>
    </div>
  );
};

export default StaticPages;
