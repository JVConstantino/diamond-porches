import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from './Header';
import Footer from './Footer';
import { PlayIcon } from './Icons';

interface CaseStudyDetailPageProps {
    caseStudyId: string;
}

type MediaItem = 
    | { type: 'image', src: string, alt: string }
    | { type: 'video', id: string, title: string };

const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({ caseStudyId }) => {
    const { caseStudies } = useAppContext();
    const caseStudy = caseStudies.find(cs => cs.id === caseStudyId);

    const mediaGallery: MediaItem[] = useMemo(() => {
        if (!caseStudy) return [];
        const images: MediaItem[] = caseStudy.images.map(img => ({ type: 'image', src: img.src, alt: img.alt }));
        const videos: MediaItem[] = caseStudy.videos.map(vid => ({ type: 'video', id: vid.id, title: vid.title }));
        // Put the main image first
        return [{ type: 'image', src: caseStudy.mainImage, alt: caseStudy.title }, ...images, ...videos];
    }, [caseStudy]);

    const [activeMedia, setActiveMedia] = useState<MediaItem | null>(mediaGallery.length > 0 ? mediaGallery[0] : null);

    if (!caseStudy) {
        return (
            <div className="bg-white">
                <Header />
                <main className="container mx-auto py-20 text-center">
                    <h1 className="text-4xl font-bold">Project Not Found</h1>
                    <p className="mt-4 text-lg">The project you are looking for does not exist or has been moved.</p>
                     <a href="/#" className="mt-8 inline-block px-6 py-3 text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700">
                        Back to Projects
                    </a>
                </main>
                <Footer />
            </div>
        );
    }
    
    const renderActiveMedia = () => {
        if (!activeMedia) return <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg">No media available</div>;

        if (activeMedia.type === 'image') {
            return <img src={activeMedia.src} alt={activeMedia.alt} className="w-full h-full object-cover rounded-lg" />;
        }
        if (activeMedia.type === 'video') {
            return (
                <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${activeMedia.id}?autoplay=1&rel=0`}
                    title={activeMedia.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            );
        }
        return null;
    }

    const isMediaActive = (media: MediaItem) => {
        if (!activeMedia) return false;
        if (media.type === 'image' && activeMedia.type === 'image') {
            return media.src === activeMedia.src;
        }
        if (media.type === 'video' && activeMedia.type === 'video') {
            return media.id === activeMedia.id;
        }
        return false;
    }

    return (
        <div className="bg-gray-50">
            <Header />
            <main>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
                        <a href="/#" className="hover:text-brand-blue-600">Home</a>
                        <span className="mx-2">&gt;</span>
                        <a href="/#casestudies" className="hover:text-brand-blue-600">Projects</a>
                        <span className="mx-2">&gt;</span>
                        <span className="font-semibold text-gray-700">{caseStudy.title}</span>
                    </nav>

                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Media Gallery */}
                            <div>
                                <div className="w-full h-72 md:h-96 mb-4 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                                    {renderActiveMedia()}
                                </div>
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                                    {mediaGallery.map((media, index) => (
                                        <button 
                                            key={index} 
                                            onClick={() => setActiveMedia(media)}
                                            aria-label={`View ${media.type} ${index+1}`}
                                            className={`relative aspect-square w-full rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 transition-all duration-200 ${isMediaActive(media) ? 'ring-2 ring-brand-blue-600' : 'ring-1 ring-gray-300 hover:ring-brand-blue-400'}`}
                                        >
                                            {media.type === 'image' && (
                                                <img src={media.src} alt={media.alt} className="w-full h-full object-cover" />
                                            )}
                                            {media.type === 'video' && (
                                                <>
                                                    <img src={`https://i.ytimg.com/vi/${media.id}/mqdefault.jpg`} alt={media.title} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                        <PlayIcon className="w-6 h-6 text-white opacity-90" />
                                                    </div>
                                                </>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="flex flex-col">
                                <h1 className="text-3xl lg:text-4xl font-bold text-brand-blue-900 font-sans">{caseStudy.title}</h1>
                                <p className="text-md text-gray-500 mt-2">{caseStudy.location}</p>

                                <div className="mt-6 pt-6 border-t">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Project Details</h2>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                                            <span className="font-semibold">Type:</span> 
                                            <span className="capitalize">{caseStudy.projectType.replace('_', ' ')}</span>
                                        </li>
                                        <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                                            <span className="font-semibold">Size:</span> 
                                            <span>{caseStudy.squareFootage} sq ft</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="mt-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                                    <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{caseStudy.description}</p>
                                </div>

                                <div className="mt-8 flex-grow flex items-end">
                                    <a href="#simulator" className="w-full text-center px-8 py-4 text-lg font-semibold text-brand-blue-900 bg-brand-gold rounded-lg shadow-xl hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transform hover:scale-105 transition-all duration-300 inline-block">
                                        Estimate a Similar Project
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CaseStudyDetailPage;
