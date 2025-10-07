import React, { useState } from 'react';

const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.0001 1.69226L3.92725 9.76511L12.0001 22.308L20.0729 9.76511L12.0001 1.69226ZM12.0001 4.33774L17.4272 9.76511H6.57294L12.0001 4.33774Z"></path>
  </svg>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#simulator', label: 'Estimator' },
    { href: '#services', label: 'Services' },
    { href: '#casestudies', label: 'Projects' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#testimonials', label: 'Reviews' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center gap-2 text-2xl font-bold text-brand-blue-800">
              <DiamondIcon className="h-6 w-6 text-brand-blue-600" />
              DIAMOND
            </a>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-600 hover:text-brand-blue-600 transition-colors duration-200 font-medium">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a href="#simulator" className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-blue-600 rounded-lg shadow-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 transition-all duration-300">
              Get Free Estimate
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-brand-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-brand-blue-600 transition-colors duration-200">
                {link.label}
              </a>
            ))}
            <a href="#simulator" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-white bg-brand-blue-600 hover:bg-brand-blue-700 transition-colors duration-200">
              Get Free Estimate
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
