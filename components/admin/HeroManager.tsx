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
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Hero Carousel</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Image</h2>
        <form onSubmit={handleAddImage} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
            />
          </div>
          <div>
             <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700">Alt Text</label>
            <input
              type="text"
              id="imageAlt"
              value={newImageAlt}
              onChange={(e) => setNewImageAlt(e.target.value)}
              placeholder="Brief description of image"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
            />
          </div>
          <div className="md:col-span-3">
            <button type="submit" className="w-full md:w-auto px-6 py-2 text-sm font-semibold text-white bg-brand-blue-600 rounded-lg shadow-md hover:bg-brand-blue-700">
              Add Image
            </button>
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Current Images</h2>
        <div className="space-y-4">
          {heroImages.map((image) => (
            <div key={image.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-4">
              <img src={image.src} alt={image.alt} className="w-32 h-20 object-cover rounded-md flex-shrink-0" />
              <div className="flex-grow">
                 <label htmlFor={`alt-${image.id}`} className="block text-xs font-medium text-gray-500">Alt Text</label>
                <input
                  id={`alt-${image.id}`}
                  type="text"
                  value={image.alt}
                  onChange={(e) => handleUpdateAlt(image.id, e.target.value)}
                  className="block w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
                />
              </div>
              <button
                onClick={() => handleRemoveImage(image.id)}
                className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200"
              >
                Remove
              </button>
            </div>
          ))}
          {heroImages.length === 0 && <p className="text-gray-500">No images in the carousel. Add one above to get started.</p>}
        </div>
      </div>
    </div>
  );
};

export default HeroManager;
