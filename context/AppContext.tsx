

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { HeroImage, ProjectType, GalleryImage, YouTubeVideo, ServicesData, Testimonial, CaseStudy, Quote } from '../types';
import { 
    INITIAL_HERO_IMAGES, 
    INITIAL_PROJECT_TYPES, 
    INITIAL_GALLERY_IMAGES, 
    INITIAL_YOUTUBE_VIDEOS,
    INITIAL_SERVICES_DATA,
    INITIAL_TESTIMONIALS,
    INITIAL_CASE_STUDIES
} from '../constants';
import { ProjectTypeEnum } from '../types';
// FIX: Import CubeIcon to resolve 'Cannot find name' error.
import { CubeIcon } from '../components/Icons';

// Helper to get data from localStorage or fallback to initial data
const useStickyState = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
};


interface AppContextType {
  heroImages: HeroImage[];
  setHeroImages: React.Dispatch<React.SetStateAction<HeroImage[]>>;
  projectTypes: ProjectType[];
  setProjectTypes: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  galleryImages: GalleryImage[];
  setGalleryImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  youtubeVideos: YouTubeVideo[];
  setYoutubeVideos: React.Dispatch<React.SetStateAction<YouTubeVideo[]>>;
  servicesData: ServicesData;
  setServicesData: React.Dispatch<React.SetStateAction<ServicesData>>;
  testimonials: Testimonial[]; // Testimonials are not editable in this version, but included for consistency
  caseStudies: CaseStudy[];
  setCaseStudies: React.Dispatch<React.SetStateAction<CaseStudy[]>>;
  quotes: Quote[];
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [heroImages, setHeroImages] = useStickyState<HeroImage[]>('diamond-hero-images', INITIAL_HERO_IMAGES);
  
  // Need to handle the 'icon' property which is a component
  const [projectTypes, setProjectTypesState] = useStickyState<Omit<ProjectType, 'icon'>[]>('diamond-project-types', INITIAL_PROJECT_TYPES.map(({icon, ...rest}) => rest));
  
  const [galleryImages, setGalleryImages] = useStickyState<GalleryImage[]>('diamond-gallery-images', INITIAL_GALLERY_IMAGES);
  const [youtubeVideos, setYoutubeVideos] = useStickyState<YouTubeVideo[]>('diamond-youtube-videos', INITIAL_YOUTUBE_VIDEOS);
  const [servicesData, setServicesData] = useStickyState<ServicesData>('diamond-services-data', INITIAL_SERVICES_DATA);
  const [caseStudies, setCaseStudies] = useStickyState<CaseStudy[]>('diamond-case-studies', INITIAL_CASE_STUDIES);
  const [quotes, setQuotes] = useStickyState<Quote[]>('diamond-quotes', []);
  
  // For now, testimonials are static.
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  // Re-hydrate project types with icon components on the client
  const hydratedProjectTypes = projectTypes.map(pt => ({
      ...pt,
      // A simple fallback icon logic
      icon: INITIAL_PROJECT_TYPES.find(p => p.id === pt.id)?.icon || CubeIcon,
  }));

  const setProjectTypes = (value: ProjectType[] | ((prevState: ProjectType[]) => ProjectType[])) => {
    const valueToStore = value instanceof Function ? value(hydratedProjectTypes) : value;
    const serializableProjectTypes = valueToStore.map(({ icon, ...rest }) => rest);
    setProjectTypesState(serializableProjectTypes);
  };

  const value = {
    heroImages,
    setHeroImages,
    projectTypes: hydratedProjectTypes,
    setProjectTypes: setProjectTypes as React.Dispatch<React.SetStateAction<ProjectType[]>>,
    galleryImages,
    setGalleryImages,
    youtubeVideos,
    setYoutubeVideos,
    servicesData,
    setServicesData,
    testimonials,
    caseStudies,
    setCaseStudies,
    quotes,
    setQuotes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
