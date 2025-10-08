import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import VideoModal from './VideoModal';
import { PlayIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { useTranslations } from '../context/LanguageProvider';

const YouTubeCarousel: React.FC = () => {
  const { youtubeVideos } = useAppContext();
  const { t } = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const openModal = (videoId: string) => {
    setSelectedVideoId(videoId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideoId(null);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const renderContent = () => {
    return (
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {youtubeVideos.map((video) => (
          <div
            key={video.id}
            className="group relative flex-shrink-0 w-80 cursor-pointer rounded-lg shadow-lg overflow-hidden"
            onClick={() => openModal(video.id)}
            style={{ scrollSnapAlign: 'start' }}
          >
            <img src={video.thumbnail.url} alt={video.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayIcon className="h-16 w-16 text-white" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                <h3 className="font-semibold text-white text-lg">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <>
      <section id="videos" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-900 font-sans">
              {t('youtube.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('youtube.subtitle')}
            </p>
          </div>

          <div className="relative mt-12">
            {renderContent()}
            
            {youtubeVideos.length > 3 && (
                 <>
                    <button
                        onClick={() => scroll('left')}
                        className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition hidden md:flex"
                        aria-label="Scroll left"
                    >
                        <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                    </button>
                     <button
                        onClick={() => scroll('right')}
                        className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition hidden md:flex"
                        aria-label="Scroll right"
                    >
                        <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                    </button>
                 </>
            )}
          </div>
        </div>
      </section>
      {selectedVideoId && (
        <VideoModal isOpen={isModalOpen} onClose={closeModal} videoId={selectedVideoId} />
      )}
    </>
  );
};

export default YouTubeCarousel;
