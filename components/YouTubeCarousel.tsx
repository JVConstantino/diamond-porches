import React, { useState, useRef, useEffect } from 'react';
import { YOUTUBE_CHANNEL_ID, MCP_SERVER_BASE_URL } from '../constants';
import type { YouTubeVideo } from '../types';
import VideoModal from './VideoModal';
import { PlayIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

const YouTubeCarousel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${MCP_SERVER_BASE_URL}/channel/videos/uploads/${YOUTUBE_CHANNEL_ID}`);
        if (!response.ok) {
          throw new Error(`Falha ao buscar vídeos (Status: ${response.status}). Verifique se o servidor MCP está rodando e acessível.`);
        }
        const data = await response.json();
        // Pega os 10 vídeos mais recentes
        setVideos(data.slice(0, 10));
        setError(null);
      } catch (err: any) {
        let errorMessage = 'Falha ao buscar vídeos. Verifique se o servidor MCP está rodando e acessível.';
        if (err instanceof TypeError && err.message === 'Failed to fetch') {
            errorMessage = 'Não foi possível conectar ao servidor de vídeos. Isso pode ser um erro de CORS ou o servidor (youtube-mcp-server) não está em execução. Certifique-se de que o servidor está rodando e configurado para aceitar requisições desta origem.';
        } else if (err.message) {
            errorMessage = err.message;
        }
        setError(errorMessage);
        console.error("Erro ao buscar vídeos do MCP Server:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

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
    if (isLoading) {
      return (
        <div className="flex space-x-6 pb-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex-shrink-0 w-80">
              <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-200 animate-pulse h-48 w-full" />
              <div className="mt-4 h-6 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 px-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-700">Ocorreu um erro</h3>
          <p className="text-red-600 mt-2">{error}</p>
          <p className="text-gray-500 text-sm mt-2">Por favor, tente novamente mais tarde.</p>
        </div>
      );
    }
    
    if (videos.length === 0) {
        return (
             <div className="text-center py-10 px-4 bg-gray-100 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">Nenhum vídeo encontrado</h3>
                <p className="text-gray-600 mt-2">Não foi possível carregar os vídeos no momento.</p>
             </div>
        )
    }

    return (
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="group relative flex-shrink-0 w-80 cursor-pointer"
            onClick={() => openModal(video.id)}
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img src={video.thumbnail.url} alt={video.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayIcon className="h-16 w-16 text-white" />
              </div>
            </div>
            <h3 className="mt-4 font-semibold text-gray-800 text-center">{video.title}</h3>
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
              See Our Work in Action
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Watch our team bring projects to life, from initial design to final walkthrough.
            </p>
          </div>

          <div className="relative mt-12">
            {renderContent()}
            
            {!isLoading && !error && videos.length > 0 && (
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