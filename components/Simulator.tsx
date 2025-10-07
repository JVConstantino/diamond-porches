
import React, { useState, useMemo } from 'react';
import type { ProjectType, Material } from '../types';
import { ProjectTypeEnum } from '../types';
import { PROJECT_TYPES } from '../constants';
import QuoteModal from './QuoteModal';

const Simulator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectType | null>(null);
  const [dimensions, setDimensions] = useState({ width: '10', length: '20' });
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectTypeSelect = (projectType: ProjectType) => {
    setSelectedProjectType(projectType);
    setSelectedMaterial(null);
    setEstimatedCost(null);
    setStep(2);
  };

  const handleDimensionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDimensions({ ...dimensions, [e.target.name]: e.target.value });
    setEstimatedCost(null);
  };
  
  const handleMaterialSelect = (material: Material) => {
      setSelectedMaterial(material);
      setStep(4);
      calculateCost(material);
  }

  const calculateCost = (material: Material) => {
    const width = parseFloat(dimensions.width) || 0;
    const length = parseFloat(dimensions.length) || 0;
    const area = width * length;

    if (area > 0 && material) {
        // Simple logic: area * cost per sq ft. Add a small complexity factor.
        const complexityFactor = 1.1;
        const baseCost = area * material.costPerSqFt * complexityFactor;
        setEstimatedCost(baseCost);
    } else {
        setEstimatedCost(null);
    }
  };

  const resetSimulator = () => {
    setStep(1);
    setSelectedProjectType(null);
    setSelectedMaterial(null);
    setEstimatedCost(null);
    setDimensions({ width: '10', length: '20' });
  };
  
  const currentStepTitle = useMemo(() => {
    if (step === 1) return "1. Select Your Project Type";
    if (step === 2) return `2. Enter Dimensions for Your ${selectedProjectType?.name}`;
    if (step === 3) return "3. Choose Your Material";
    if (step === 4) return "4. Your Estimated Cost";
    return "";
  }, [step, selectedProjectType]);


  return (
    <section id="simulator" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-900 font-sans">
              Get an Estimate in 60 Seconds
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Follow these simple steps to get a real-time price estimate for your project.
            </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-xl sm:text-2xl font-semibold text-center text-brand-blue-800 mb-6">{currentStepTitle}</h3>
            
            {/* Step 1: Project Type */}
            {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {PROJECT_TYPES.map((pt) => {
                        const Icon = pt.icon;
                        return (
                            <button
                                key={pt.id}
                                onClick={() => handleProjectTypeSelect(pt)}
                                className="group p-6 text-center bg-white rounded-xl border-2 border-gray-200 hover:border-brand-blue-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
                            >
                                <Icon className="h-12 w-12 mx-auto text-brand-blue-500 group-hover:text-brand-blue-600 transition-colors" />
                                <p className="mt-4 font-semibold text-lg text-gray-800">{pt.name}</p>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Step 2: Dimensions */}
            {step === 2 && (
                <div className="text-center">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <div className="w-full sm:w-auto">
                            <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Width (feet)</label>
                            <input type="number" name="width" id="width" value={dimensions.width} onChange={handleDimensionsChange} className="w-full text-center text-lg p-3 rounded-lg border-gray-300 focus:ring-brand-blue-500 focus:border-brand-blue-500" />
                        </div>
                        <span className="text-2xl font-light text-gray-400 mt-6 hidden sm:inline">×</span>
                        <div className="w-full sm:w-auto">
                            <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">Length (feet)</label>
                            <input type="number" name="length" id="length" value={dimensions.length} onChange={handleDimensionsChange} className="w-full text-center text-lg p-3 rounded-lg border-gray-300 focus:ring-brand-blue-500 focus:border-brand-blue-500" />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center gap-4">
                        <button onClick={() => setStep(1)} className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                        <button onClick={() => setStep(3)} className="px-8 py-3 text-base font-semibold text-white bg-brand-blue-600 rounded-lg shadow-md hover:bg-brand-blue-700 transition-all">Next: Choose Material</button>
                    </div>
                </div>
            )}
            
            {/* Step 3: Materials */}
            {step === 3 && selectedProjectType && (
                 <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        {selectedProjectType.materials.map((mat) => (
                           <button
                             key={mat.id}
                             onClick={() => handleMaterialSelect(mat)}
                             className="group text-left bg-white rounded-xl border-2 border-gray-200 hover:border-brand-blue-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 overflow-hidden"
                           >
                            <img src={mat.imageUrl} alt={mat.name} className="w-full h-32 object-cover" />
                             <div className="p-4">
                               <p className="font-semibold text-lg text-gray-800">{mat.name}</p>
                               <p className="text-sm text-gray-500">${mat.costPerSqFt} / sq ft</p>
                             </div>
                           </button>
                        ))}
                    </div>
                     <div className="mt-8 flex justify-center gap-4">
                         <button onClick={() => setStep(2)} className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                     </div>
                </div>
            )}

            {/* Step 4: Result */}
            {step === 4 && estimatedCost !== null && (
                <div className="text-center p-6 bg-white rounded-lg shadow-inner border border-green-200">
                    <p className="text-lg text-gray-600">Your Estimated Project Cost:</p>
                    <p className="text-5xl font-bold text-green-600 my-4">
                        ${estimatedCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                        *This is a preliminary estimate. Final cost may vary based on site conditions, specific features, and local regulations.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                         <button onClick={resetSimulator} className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors w-full sm:w-auto">Start Over</button>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition-all w-full sm:w-auto"
                        >
                            Request Detailed Quote
                        </button>
                    </div>
                </div>
            )}
        </div>
        <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} estimate={estimatedCost} projectDetails={{type: selectedProjectType?.name, material: selectedMaterial?.name, dimensions: `${dimensions.width}x${dimensions.length}`}} />
      </div>
    </section>
  );
};

export default Simulator;
