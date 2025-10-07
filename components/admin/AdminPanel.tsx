import React, { useState } from 'react';
import HeroManager from './HeroManager';
import ProjectManager from './ProjectManager';
import GalleryManager from './GalleryManager';
import YouTubeManager from './YouTubeManager';
import ServicesManager from './ServicesManager';
import CaseStudiesManager from './CaseStudiesManager';
import { 
    PhotoIcon, 
    WrenchScrewdriverIcon as SettingsIcon, 
    ClipboardDocumentListIcon, 
    VideoCameraIcon,
    Bars3Icon,
    HomeIcon,
    ArrowLeftOnRectangleIcon
} from '../Icons';


type AdminView = 'hero' | 'projects' | 'gallery' | 'youtube' | 'services' | 'casestudies';

interface AdminPanelProps {
  onLogout: () => void;
}

const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.0001 1.69226L3.92725 9.76511L12.0001 22.308L20.0729 9.76511L12.0001 1.69226ZM12.0001 4.33774L17.4272 9.76511H6.57294L12.0001 4.33774Z"></path>
    </svg>
  );

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [view, setView] = useState<AdminView>('hero');

  const navItems: { key: AdminView, label: string, icon: React.ElementType }[] = [
    { key: 'hero', label: 'Hero Carousel', icon: PhotoIcon },
    { key: 'projects', label: 'Project Simulator', icon: SettingsIcon },
    { key: 'casestudies', label: 'Case Studies', icon: ClipboardDocumentListIcon },
    { key: 'gallery', label: 'Gallery Images', icon: PhotoIcon },
    { key: 'youtube', label: 'YouTube Videos', icon: VideoCameraIcon },
    { key: 'services', label: 'Services List', icon: Bars3Icon },
  ];
  
  const currentViewTitle = navItems.find(item => item.key === view)?.label || 'Dashboard';

  const renderView = () => {
    switch (view) {
      case 'hero': return <HeroManager />;
      case 'projects': return <ProjectManager />;
      case 'casestudies': return <CaseStudiesManager title={currentViewTitle} />;
      case 'gallery': return <GalleryManager />;
      case 'youtube': return <YouTubeManager />;
      case 'services': return <ServicesManager />;
      default: return <HeroManager />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-body">
      <aside className="w-64 bg-white text-gray-800 flex flex-col border-r border-gray-200">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <a href="/#" className="flex items-center gap-2 text-xl font-bold text-brand-blue-800">
            <DiamondIcon className="h-6 w-6 text-brand-blue-600" />
            DIAMOND
          </a>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
                 <button
                  key={item.key}
                  onClick={() => setView(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    view === item.key
                      ? 'bg-brand-blue-50 text-brand-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-200 space-y-2">
            <a href="/#" className="flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <HomeIcon className="h-5 w-5" />
                View Live Site
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              Log Out
            </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 sm:p-8">
            {renderView()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;