import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { ProjectType, Material } from '../../types';

const ProjectManager: React.FC = () => {
  const { projectTypes, setProjectTypes } = useAppContext();

  // For simplicity, this manager will just edit existing project types and their materials.
  // Adding a brand new project type would require icon selection logic which adds complexity.

  const handleMaterialChange = (projectTypeId: string, materialId: string, field: keyof Material, value: string | number) => {
    const updatedProjectTypes = projectTypes.map(pt => {
      if (pt.id === projectTypeId) {
        const updatedMaterials = pt.materials.map(mat => {
          if (mat.id === materialId) {
            return { ...mat, [field]: value };
          }
          return mat;
        });
        return { ...pt, materials: updatedMaterials };
      }
      return pt;
    });
    setProjectTypes(updatedProjectTypes);
  };
  
  const handleAddMaterial = (projectTypeId: string) => {
    const newMaterial: Material = {
      id: `new-mat-${Date.now()}`,
      name: 'New Material',
      costPerSqFt: 0,
      imageUrl: 'https://picsum.photos/seed/new/400/300'
    };
    
    const updatedProjectTypes = projectTypes.map(pt => {
        if (pt.id === projectTypeId) {
            return {...pt, materials: [...pt.materials, newMaterial]};
        }
        return pt;
    });
    setProjectTypes(updatedProjectTypes);
  };
  
  const handleRemoveMaterial = (projectTypeId: string, materialId: string) => {
      if (!window.confirm("Are you sure you want to remove this material?")) return;

      const updatedProjectTypes = projectTypes.map(pt => {
        if (pt.id === projectTypeId) {
            const updatedMaterials = pt.materials.filter(mat => mat.id !== materialId);
            return {...pt, materials: updatedMaterials};
        }
        return pt;
    });
    setProjectTypes(updatedProjectTypes);
  };


  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Project Simulator</h1>
      <p className="text-sm text-gray-600 mb-6 -mt-4">Edit the materials and costs for each project type available in the simulator. Changes are saved automatically.</p>
      
      <div className="space-y-8">
        {projectTypes.map(pt => (
          <div key={pt.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-brand-blue-800 mb-4">{pt.name}</h2>
            <div className="space-y-4">
              {pt.materials.map(mat => (
                <div key={mat.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-2 border-b">
                  <div className="md:col-span-3">
                    <label className="block text-xs font-medium text-gray-500">Name</label>
                    <input type="text" value={mat.name} onChange={e => handleMaterialChange(pt.id, mat.id, 'name', e.target.value)} className="w-full p-1 border rounded" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500">Cost/SqFt</label>
                    <input type="number" value={mat.costPerSqFt} onChange={e => handleMaterialChange(pt.id, mat.id, 'costPerSqFt', parseFloat(e.target.value))} className="w-full p-1 border rounded" />
                  </div>
                   <div className="md:col-span-6">
                    <label className="block text-xs font-medium text-gray-500">Image URL</label>
                    <input type="url" value={mat.imageUrl} onChange={e => handleMaterialChange(pt.id, mat.id, 'imageUrl', e.target.value)} className="w-full p-1 border rounded" />
                  </div>
                  <div className="md:col-span-1 text-right">
                     <button onClick={() => handleRemoveMaterial(pt.id, mat.id)} className="text-red-500 hover:text-red-700 text-sm mt-4">Remove</button>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <button onClick={() => handleAddMaterial(pt.id)} className="px-4 py-1.5 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700">Add Material</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
