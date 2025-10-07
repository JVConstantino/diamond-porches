import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { CaseStudy, ProjectType } from '../../types';
import { ProjectTypeEnum } from '../../types';
import CaseStudyForm from './CaseStudyForm';

const CaseStudiesManager: React.FC = () => {
  const { caseStudies, setCaseStudies, projectTypes } = useAppContext();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);

  const openForm = (study: CaseStudy | null = null) => {
    setEditingStudy(study);
    setIsFormVisible(true);
  };
  
  const closeForm = () => {
    setIsFormVisible(false);
    setEditingStudy(null);
  }

  const handleSave = (studyData: CaseStudy) => {
    if (caseStudies.find(cs => cs.id === studyData.id)) {
      // Update existing
      setCaseStudies(caseStudies.map(cs => cs.id === studyData.id ? studyData : cs));
    } else {
      // Add new
      setCaseStudies([studyData, ...caseStudies]);
    }
    closeForm();
  };

  const handleCreateNew = () => {
     const newStudy: CaseStudy = {
            id: `cs-${Date.now()}`,
            title: 'New Project',
            location: 'Location',
            description: 'Detailed description of the work performed.',
            squareFootage: 0,
            projectType: projectTypes[0]?.id || ProjectTypeEnum.Deck,
            mainImage: 'https://picsum.photos/seed/new-project/800/600',
            images: [],
            videos: [],
        };
    openForm(newStudy);
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
        setCaseStudies(caseStudies.filter(cs => cs.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Case Studies</h1>
        <button onClick={handleCreateNew} className="px-4 py-2 text-sm font-semibold text-white bg-brand-blue-600 rounded-lg shadow-md hover:bg-brand-blue-700">
            Add New Case Study
        </button>
      </div>
      
      {isFormVisible && editingStudy && (
        <CaseStudyForm study={editingStudy} onSave={handleSave} onCancel={closeForm} projectTypes={projectTypes} />
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map(study => (
          <div key={study.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
            <img src={study.mainImage} alt={study.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{study.title}</h3>
              <p className="text-sm text-gray-500">{study.location}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => openForm(study)} className="flex-1 px-3 py-1 text-sm font-medium text-white bg-brand-blue-600 rounded-md hover:bg-brand-blue-700">Edit</button>
              <button onClick={() => handleDelete(study.id)} className="flex-1 px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesManager;
