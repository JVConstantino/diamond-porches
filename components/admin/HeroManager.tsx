import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { HeroImage } from '../../types';

const HeroManager: React.FC = () => {
  const { heroImages, setHeroImages } = useAppContext();
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImageUrl.trim()) {
      const newImage: HeroImage = {
        id: new Date().toISOString(),
        src: newImageUrl.trim(),
        alt: newImageAlt.trim() || 'Hero background image',
      };
      setHeroImages([...heroImages, newImage]);
      setNewImageUrl('');
      setNewImageAlt('');
    }
  };

  const handleRemoveImage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setHeroImages(heroImages.filter((image) => image.id !== id));
    }
  };

  const handleUpdateAlt = (id: string, alt: string) => {
    setHeroImages(
      heroImages.map((image) => (image.id === id ? { ...image, alt } : image))
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Manage Hero Carousel</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Image</h2>
        <form onSubmit={handleAddImage} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
            />
          </div>
          <div>
             <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
            <input
              type="text"
              id="imageAlt"
              value={newImageAlt}
              onChange={(e) => setNewImageAlt(e.target.value)}
              placeholder="Brief description of image"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
            />
          </div>
          <div className="md:col-span-3">
            <button type="submit" className="w-full md:w-auto px-6 py-2 text-sm font-semibold text-white bg-brand-blue-600 rounded-lg shadow-sm hover:bg-brand-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 transition-colors">
              Add Image
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Current Images</h2>
        <div className="space-y-4">
          {heroImages.map((image) => (
            <div key={image.id} className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row items-center gap-4">
              <img src={image.src} alt={image.alt} className="w-32 h-20 object-cover rounded-md flex-shrink-0" />
              <div className="flex-grow w-full">
                 <label htmlFor={`alt-${image.id}`} className="block text-xs font-medium text-gray-500 mb-1">Alt Text</label>
                <input
                  id={`alt-${image.id}`}
                  type="text"
                  value={image.alt}
                  onChange={(e) => handleUpdateAlt(image.id, e.target.value)}
                  className="block w-full text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                />
              </div>
              <button
                onClick={() => handleRemoveImage(image.id)}
                className="w-full md:w-auto mt-2 md:mt-0 px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          {heroImages.length === 0 && <p className="text-gray-500 py-4 text-center">No images in the carousel. Add one above to get started.</p>}
        </div>
      </div>
    </div>
  );
};

export default HeroManager;