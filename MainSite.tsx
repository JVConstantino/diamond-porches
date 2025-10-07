import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Simulator from './components/Simulator';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import TrustBadges from './components/TrustBadges';
import YouTubeCarousel from './components/YouTubeCarousel';
import Footer from './components/Footer';
import CaseStudies from './components/CaseStudies';

const MainSite: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-body">
      <Header />
      <main>
        <Hero />
        <Simulator />
        <TrustBadges />
        <Services />
        <CaseStudies />
        <Gallery />
        <Testimonials />
        <YouTubeCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default MainSite;
