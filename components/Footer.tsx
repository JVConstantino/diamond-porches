import React from 'react';
import { useTranslations } from '../context/LanguageProvider';

const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.0001 1.69226L3.92725 9.76511L12.0001 22.308L20.0729 9.76511L12.0001 1.69226ZM12.0001 4.33774L17.4272 9.76511H6.57294L12.0001 4.33774Z"></path>
    </svg>
  );

const Footer: React.FC = () => {
  const { t } = useTranslations();
  
  const navLinks = [
    { href: '#simulator', label: t('nav.estimator') },
    { href: '#services', label: t('nav.services') },
    { href: '#casestudies', label: t('nav.projects') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#testimonials', label: t('nav.reviews') },
  ];
  
  const services = [
      'Screened Porches',
      'Gutter Guards',
      'Vinyl Siding',
      'Fencing',
      'Screen Repair',
      'Shutter Services'
    ];

  return (
    <footer className="bg-brand-blue-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
             <a href="#" className="flex items-center gap-2 text-2xl font-bold">
                <DiamondIcon className="h-6 w-6 text-brand-blue-500" />
                DIAMOND
             </a>
            <p className="mt-4 text-sm text-blue-200">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase">{t('footer.services_title')}</h3>
            <ul className="mt-4 space-y-2">
              {services.map(service => (
                <li key={service}><a href="#services" className="text-sm text-blue-200 hover:text-white transition-colors">{service}</a></li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase">{t('footer.links_title')}</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map(link => (
                <li key={link.href}><a href={link.href} className="text-sm text-blue-200 hover:text-white transition-colors">{link.label}</a></li>
              ))}
              <li><a href="#admin" className="text-sm text-blue-200 hover:text-white transition-colors">{t('nav.admin')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase">{t('footer.contact_title')}</h3>
            <ul className="mt-4 space-y-2 text-sm text-blue-200">
                <li>(800) 555-0199</li>
                <li>contact@diamonddecks.com</li>
                <li>{t('footer.contact_location')}</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-brand-blue-900 text-center text-sm text-blue-300">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
