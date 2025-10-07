
import React, { useState, useMemo } from 'react';
import type { GalleryImage } from '../types';
import { ProjectTypeEnum } from '../types';
import { GALLERY_IMAGES } from '../constants';

const filters = [
    { label: 'All Projects', value: 'all' },
    { label: 'Decks & Patios', value: ProjectTypeEnum.Deck },
    { label: 'Pool Fences', value: ProjectTypeEnum.PoolFence },
    { label: 'Gutter Guards', value: ProjectTypeEnum.Gutters },
];

const Gallery: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    
    const filteredImages = useMemo(() => {
        if (activeFilter === 'all') {
            return GALLERY_IMAGES;
        }
        return GALLERY_IMAGES.filter(image => image.category === activeFilter);
    }, [activeFilter]);

    return (
        <section id="gallery" className="py-16 sm:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-900 font-sans">
                        Quality You Can See
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Browse our gallery of recently completed projects and find inspiration for your own home.
                    </p>
                </div>

                <div className="mt-10 flex justify-center flex-wrap gap-2 sm:gap-4">
                    {filters.map(filter => (
                        <button
                            key={filter.value}
                            onClick={() => setActiveFilter(filter.value)}
                            className={`px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-300 ${
                                activeFilter === filter.value
                                    ? 'bg-brand-blue-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredImages.map((image) => (
                        <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-lg aspect-w-4 aspect-h-3">
                           <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                loading="lazy"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                           <div className="absolute bottom-0 left-0 p-4">
                                <p className="text-white text-lg font-semibold">{image.alt}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
