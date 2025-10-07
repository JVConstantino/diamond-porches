import React from 'react';
import type { CaseStudy } from '../types';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose, caseStudy }) => {
  if (!isOpen) return null;

  const beforeImages = caseStudy.images.filter(img => img.type === 'before');
  const afterImages = caseStudy.images.filter(img => img.type === 'after');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 transition-opacity" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white p-4 sm:p-6 border-b z-10 flex justify-between items-start flex-shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-brand-blue-900 font-sans">{caseStudy.title}</h2>
              <p className="text-gray-500">{caseStudy.location}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none">&times;</button>
        </div>
        
        <div className="overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                     <h3 className="text-lg font-semibold text-gray-800 mb-2">Project Description</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{caseStudy.description}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border self-start">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Details</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex justify-between"><span>Project Type:</span> <strong>{caseStudy.projectType}</strong></li>
                        <li className="flex justify-between"><span>Area/Size:</span> <strong>{caseStudy.squareFootage} sq ft</strong></li>
                    </ul>
                </div>
            </div>
           
            {/* Image Gallery */}
            {(beforeImages.length > 0 || afterImages.length > 0) && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Photo Gallery</h3>
              {beforeImages.length > 0 && (
                <>
                  <h4 className="font-semibold text-gray-700 mb-2">Before</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {beforeImages.map((img, i) => <img key={i} src={img.src} alt={img.alt} className="w-full h-auto object-cover rounded-md shadow"/>)}
                  </div>
                </>
              )}
              {afterImages.length > 0 && (
                 <>
                  <h4 className="font-semibold text-gray-700 mb-2">After</h4>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {afterImages.map((img, i) => <img key={i} src={img.src} alt={img.alt} className="w-full h-auto object-cover rounded-md shadow"/>)}
                  </div>
                 </>
              )}
            </div>
            )}

            {/* Video Section */}
            {caseStudy.videos.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Videos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {caseStudy.videos.map(video => (
                            <div key={video.id} className="aspect-video">
                                <iframe
                                    className="w-full h-full rounded-lg shadow-lg"
                                    src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
