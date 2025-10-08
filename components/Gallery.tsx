import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTranslations } from '../context/LanguageProvider';

const Gallery: React.FC = () => {
    const { galleryImages, projectTypes } = useAppContext();
    const { t } = useTranslations();
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = useMemo(() => [
        { label: t('gallery.filter_all'), value: 'all' },
        ...projectTypes.map(pt => ({ label: t(pt.id), value: pt.id })),
    ], [projectTypes, t]);
    
    const filteredImages = useMemo(() => {
        if (activeFilter === 'all') {
            return galleryImages;
        }
        return galleryImages.filter(image => image.category === activeFilter);
    }, [activeFilter, galleryImages]);

    return (
        <section id="gallery" className="py-16 sm:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-900 font-sans">
                        {t('gallery.title')}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        {t('gallery.subtitle')}
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
                                alt={t(`gallery.alt.${image.id}`)}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                loading="lazy"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                           <div className="absolute bottom-0 left-0 p-4">
                                <p className="text-white text-lg font-semibold">{t(`gallery.alt.${image.id}`)}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
