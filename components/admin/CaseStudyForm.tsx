import React, { useState } from 'react';
import type { CaseStudy, CaseStudyImage, CaseStudyVideo, ProjectType } from '../../types';

interface CaseStudyFormProps {
    study: CaseStudy;
    onSave: (study: CaseStudy) => void;
    onCancel: () => void;
    projectTypes: ProjectType[];
}

const CaseStudyForm: React.FC<CaseStudyFormProps> = ({ study, onSave, onCancel, projectTypes }) => {
    const [formData, setFormData] = useState<CaseStudy>(study);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'squareFootage' ? Number(value) : value }));
    };

    const handleSubChange = (type: 'images' | 'videos', index: number, field: string, value: string) => {
        setFormData(prev => {
            const items = [...prev[type]];
            const itemToUpdate = { ...items[index] } as any;
            itemToUpdate[field] = value;
            items[index] = itemToUpdate;
            return { ...prev, [type]: items };
        });
    };

    const addSubItem = (type: 'images' | 'videos') => {
        const newItem = type === 'images' 
            ? { src: '', alt: '', type: 'after' } as CaseStudyImage
            : { id: '', title: '' } as CaseStudyVideo;
        setFormData(prev => ({ ...prev, [type]: [...prev[type], newItem] }));
    };

    const removeSubItem = (type: 'images' | 'videos', index: number) => {
         setFormData(prev => ({ ...prev, [type]: prev[type].filter((_, i) => i !== index) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={onCancel}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    <div className="p-6 border-b">
                         <h2 className="text-xl font-bold text-gray-800">{study.id.startsWith('cs-') && formData.title === 'New Project Case Study' ? 'Add New Case Study' : 'Edit Case Study'}</h2>
                    </div>
                    <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                        {/* Basic Info */}
                        <div className="p-4 border rounded-md">
                            <h3 className="font-semibold mb-3 text-gray-700">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input name="title" value={formData.title} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><input name="location" value={formData.location} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" /></div>
                            </div>
                            <div className="mt-4"><label className="block text-sm font-medium text-gray-700 mb-1">Main Image (URL)</label><input name="mainImage" value={formData.mainImage} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required/></div>
                            <div className="mt-4"><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full mt-1 p-2 border border-gray-300 rounded-md" /></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Area (sq ft)</label><input type="number" name="squareFootage" value={formData.squareFootage} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label><select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md">{projectTypes.map(pt => <option key={pt.id} value={pt.id}>{pt.name}</option>)}</select></div>
                            </div>
                        </div>
                        
                        {/* Images */}
                        <div className="p-4 border rounded-md">
                            <h3 className="font-semibold text-gray-700">Photos (Before/After)</h3>
                             <div className="space-y-2 mt-3">
                                {formData.images.map((img, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-2 p-2 border-b items-center">
                                        <div className="col-span-12 md:col-span-5"><input placeholder="Image URL" value={img.src} onChange={e => handleSubChange('images', index, 'src', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" /></div>
                                        <div className="col-span-12 md:col-span-4"><input placeholder="Description (alt text)" value={img.alt} onChange={e => handleSubChange('images', index, 'alt', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" /></div>
                                        <div className="col-span-8 md:col-span-2"><select value={img.type} onChange={e => handleSubChange('images', index, 'type', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md"><option value="before">Before</option><option value="after">After</option></select></div>
                                        <div className="col-span-4 md:col-span-1 text-right"><button type="button" onClick={() => removeSubItem('images', index)} className="px-2 py-1 text-red-500 hover:text-red-700 font-bold">✕</button></div>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={() => addSubItem('images')} className="mt-3 text-sm font-semibold text-brand-blue-600 hover:text-brand-blue-800">+ Add Photo</button>
                        </div>
                        
                        {/* Videos */}
                        <div className="p-4 border rounded-md">
                             <h3 className="font-semibold text-gray-700">Videos</h3>
                             <div className="space-y-2 mt-3">
                                {formData.videos.map((vid, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-2 p-2 border-b items-center">
                                        <div className="col-span-12 md:col-span-6"><input placeholder="YouTube Video ID" value={vid.id} onChange={e => handleSubChange('videos', index, 'id', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" /></div>
                                        <div className="col-span-8 md:col-span-5"><input placeholder="Video Title" value={vid.title} onChange={e => handleSubChange('videos', index, 'title', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" /></div>
                                        <div className="col-span-4 md:col-span-1 text-right"><button type="button" onClick={() => removeSubItem('videos', index)} className="px-2 py-1 text-red-500 hover:text-red-700 font-bold">✕</button></div>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={() => addSubItem('videos')} className="mt-3 text-sm font-semibold text-brand-blue-600 hover:text-brand-blue-800">+ Add Video</button>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-end gap-4 flex-shrink-0 border-t">
                        <button type="button" onClick={onCancel} className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold text-sm">Cancel</button>
                        <button type="submit" className="px-6 py-2.5 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 font-semibold text-sm shadow-sm">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CaseStudyForm;