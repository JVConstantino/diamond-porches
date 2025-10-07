import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { GalleryImage } from '../../types';
import { ProjectTypeEnum } from '../../types';

const GalleryManager: React.FC = () => {
  const { galleryImages, setGalleryImages, projectTypes } = useAppContext();
  
  const [newImage, setNewImage] = useState({
    src: '',
    alt: '',
    category: projectTypes[0]?.id || ProjectTypeEnum.Deck,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewImage({ ...newImage, [e.target.name]: e.target.value });
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImage.src.trim() && newImage.alt.trim()) {
      const imageToAdd: GalleryImage = {
        ...newImage,
        id: `gallery-${Date.now()}`,
      };
      setGalleryImages([imageToAdd, ...galleryImages]);
      setNewImage({ src: '', alt: '', category: projectTypes[0]?.id || ProjectTypeEnum.Deck });
    }
  };

  const handleRemoveImage = (id: string | number) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setGalleryImages(galleryImages.filter((image) => image.id !== id));
    }
  };
  
  const handleUpdateImage = (id: string | number, field: keyof GalleryImage, value: string) => {
      setGalleryImages(galleryImages.map(img => img.id === id ? {...img, [field]: value} : img));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Gallery Images</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Image</h2>
        <form onSubmit={handleAddImage} className="space-y-4">
          <div>
            <label htmlFor="src" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" name="src" value={newImage.src} onChange={handleInputChange} required className="mt-1 w-full p-2 border rounded"/>
          </div>
          <div>
            <label htmlFor="alt" className="block text-sm font-medium text-gray-700">Alt Text (Description)</label>
            <input type="text" name="alt" value={newImage.alt} onChange={handleInputChange} required className="mt-1 w-full p-2 border rounded"/>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" value={newImage.category} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded">
              {projectTypes.map(pt => (
                <option key={pt.id} value={pt.id}>{pt.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="px-6 py-2 text-sm font-semibold text-white bg-brand-blue-600 rounded-lg shadow-md hover:bg-brand-blue-700">
            Add Image
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Current Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="bg-white p-4 rounded-lg shadow-md space-y-3">
              <img src={image.src} alt={image.alt} className="w-full h-40 object-cover rounded-md" />
              <div>
                 <label className="text-xs font-medium text-gray-500">Alt Text</label>
                 <input type="text" value={image.alt} onChange={e => handleUpdateImage(image.id, 'alt', e.target.value)} className="w-full p-1 border rounded text-sm" />
              </div>
              <div>
                 <label className="text-xs font-medium text-gray-500">Category</label>
                 <select value={image.category} onChange={e => handleUpdateImage(image.id, 'category', e.target.value)} className="w-full p-1 border rounded text-sm">
                    {projectTypes.map(pt => <option key={pt.id} value={pt.id}>{pt.name}</option>)}
                 </select>
              </div>
              <button onClick={() => handleRemoveImage(image.id)} className="w-full mt-2 px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryManager;
