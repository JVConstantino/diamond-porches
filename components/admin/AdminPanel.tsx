import React, { useState } from 'react';
import HeroManager from './HeroManager';
import ProjectManager from './ProjectManager';
import GalleryManager from './GalleryManager';
import YouTubeManager from './YouTubeManager';
import ServicesManager from './ServicesManager';

type AdminView = 'hero' | 'projects' | 'gallery' | 'youtube' | 'services';

const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.0001 1.69226L3.92725 9.76511L12.0001 22.308L20.0729 9.76511L12.0001 1.69226ZM12.0001 4.33774L17.4272 9.76511H6.57294L12.0001 4.33774Z"></path>
    </svg>
  );

const AdminPanel: React.FC = () => {
  const [view, setView] = useState<AdminView>('hero');

  const navItems: { key: AdminView, label: string }[] = [
    { key: 'hero', label: 'Hero Carousel' },
    { key: 'projects', label: 'Project Simulator' },
    { key: 'gallery', label: 'Gallery Images' },
    { key: 'youtube', label: 'YouTube Videos' },
    { key: 'services', label: 'Services List' },
  ];

  const renderView = () => {
    switch (view) {
      case 'hero': return <HeroManager />;
      case 'projects': return <ProjectManager />;
      case 'gallery': return <GalleryManager />;
      case 'youtube': return <YouTubeManager />;
      case 'services': return <ServicesManager />;
      default: return <HeroManager />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-body">
      <aside className="w-64 bg-brand-blue-950 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-brand-blue-900">
          <a href="/" className="flex items-center gap-2 text-xl font-bold">
            <DiamondIcon className="h-6 w-6 text-brand-blue-500" />
            DIAMOND Admin
          </a>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === item.key
                  ? 'bg-brand-blue-700 text-white'
                  : 'text-blue-100 hover:bg-brand-blue-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-brand-blue-900">
            <a href="/" className="block w-full text-center px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300">
                View Live Site
            </a>
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default AdminPanel;
