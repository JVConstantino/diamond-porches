import React from 'react';
import { useAppContext } from '../../context/AppContext';
import type { Material } from '../../types';

const ProjectManager: React.FC = () => {
  const { projectTypes, setProjectTypes } = useAppContext();

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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Manage Project Simulator</h1>
      <p className="text-gray-600 -mt-6">Edit the materials and costs for each project type available in the simulator. Changes are saved automatically.</p>
      
      <div className="space-y-8">
        {projectTypes.map(pt => (
          <div key={pt.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-brand-blue-800 mb-4">{pt.name}</h2>
            <div className="space-y-4">
              {pt.materials.map(mat => (
                <div key={mat.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-3 border-b border-gray-200 last:border-b-0">
                  <div className="md:col-span-3">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                    <input type="text" value={mat.name} onChange={e => handleMaterialChange(pt.id, mat.id, 'name', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Cost/SqFt</label>
                    <input type="number" value={mat.costPerSqFt} onChange={e => handleMaterialChange(pt.id, mat.id, 'costPerSqFt', parseFloat(e.target.value))} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                   <div className="md:col-span-6">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Image URL</label>
                    <input type="url" value={mat.imageUrl} onChange={e => handleMaterialChange(pt.id, mat.id, 'imageUrl', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="md:col-span-1 text-right self-end">
                     <button onClick={() => handleRemoveMaterial(pt.id, mat.id)} className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors">Remove</button>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <button onClick={() => handleAddMaterial(pt.id)} className="px-4 py-2 text-sm font-semibold text-white bg-brand-blue-600 rounded-lg shadow-sm hover:bg-brand-blue-700">Add Material</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;