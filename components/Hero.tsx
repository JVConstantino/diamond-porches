
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-brand-blue-900 text-white py-20 sm:py-28 lg:py-32">
       <div className="absolute inset-0">
        <img src="https://picsum.photos/seed/hero-bg/1920/1080" alt="Beautiful modern deck" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-950 to-brand-blue-800/60"></div>
       </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold !leading-tight tracking-tight font-sans">
            Your Dream Project, <span className="text-brand-gold">Instantly</span> Priced.
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-blue-100">
            Stop waiting for callbacks. Use our free tool to get an instant, transparent price estimate for your new deck, pool fence, or gutter guards.
          </p>
          <div className="mt-10">
            <a
              href="#simulator"
              className="px-8 py-4 text-lg font-semibold text-brand-blue-900 bg-brand-gold rounded-lg shadow-xl hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-blue-900 focus:ring-brand-gold transform hover:scale-105 transition-all duration-300"
            >
              Start My Free Estimate
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
