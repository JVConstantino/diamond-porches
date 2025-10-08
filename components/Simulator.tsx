import React, { useState, useMemo, useEffect } from 'react';
import type { ProjectType, Material, Quote } from '../types';
import { useAppContext } from '../context/AppContext';
import { useTranslations } from '../context/LanguageProvider';

const Simulator: React.FC = () => {
  const { projectTypes, setQuotes } = useAppContext();
  const { t } = useTranslations();
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({ name: '', city: '', neighborhood: '', phone: '' });
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectType | null>(null);
  const [dimensions, setDimensions] = useState({ width: '10', length: '20' });
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  useEffect(() => {
    if (step === 5 && estimatedCost !== null && selectedProjectType && selectedMaterial) {
        const newQuote: Quote = {
            id: new Date().toISOString(),
            date: new Date().toISOString(),
            userInfo: userInfo,
            projectType: {
                id: selectedProjectType.id,
                name: selectedProjectType.name,
            },
            dimensions: dimensions,
            material: {
                id: selectedMaterial.id,
                name: selectedMaterial.name,
            },
            estimatedCost: estimatedCost,
        };
        
        setQuotes(prevQuotes => {
            const isDuplicate = prevQuotes.some(q => 
                q.userInfo.name === newQuote.userInfo.name &&
                q.userInfo.phone === newQuote.userInfo.phone &&
                q.estimatedCost === newQuote.estimatedCost &&
                (new Date().getTime() - new Date(q.date).getTime()) < 60000 // Throttle submissions for 1 minute
            );
            if (isDuplicate) {
                return prevQuotes;
            }
            return [newQuote, ...prevQuotes];
        });
    }
  }, [step, estimatedCost]);


  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.name.trim() && userInfo.city.trim() && userInfo.phone.trim()) {
      setStep(2);
    }
  };

  const handleProjectTypeSelect = (projectType: ProjectType) => {
    setSelectedProjectType(projectType);
    setSelectedMaterial(null);
    setEstimatedCost(null);
    setStep(3);
  };

  const handleDimensionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDimensions({ ...dimensions, [e.target.name]: e.target.value });
    setEstimatedCost(null);
  };
  
  const handleMaterialSelect = (material: Material) => {
      setSelectedMaterial(material);
      setStep(5);
      calculateCost(material);
  }

  const calculateCost = (material: Material) => {
    const width = parseFloat(dimensions.width) || 0;
    const length = parseFloat(dimensions.length) || 0;
    const area = width * length;

    if (area > 0 && material) {
        const complexityFactor = 1.1;
        const baseCost = area * material.costPerSqFt * complexityFactor;
        setEstimatedCost(baseCost);
    } else {
        setEstimatedCost(null);
    }
  };

  const resetSimulator = () => {
    setStep(1);
    setUserInfo({ name: '', city: '', neighborhood: '', phone: '' });
    setSelectedProjectType(null);
    setSelectedMaterial(null);
    setEstimatedCost(null);
    setDimensions({ width: '10', length: '20' });
  };
  
  const currentStepTitle = useMemo(() => {
    if (step === 1) return t('simulator.step1_title');
    if (step === 2) return t('simulator.step2_title');
    if (step === 3) return t('simulator.step3_title', { projectType: selectedProjectType ? t(selectedProjectType.id) : '' });
    if (step === 4) return t('simulator.step4_title');
    if (step === 5) return t('simulator.step5_title');
    return "";
  }, [step, selectedProjectType, t]);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
      const companyPhone = '18005550199'; // Placeholder phone number
      const message = `Hello DIAMOND, I've generated an estimate from your website and would like to finalize the details.\n\n*Client:* ${userInfo.name}\n*Phone:* ${userInfo.phone}\n*Location:* ${userInfo.city}, ${userInfo.neighborhood}\n\n*Project Details:*\n- Type: ${selectedProjectType?.name}\n- Dimensions: ${dimensions.width}ft x ${dimensions.length}ft\n- Material: ${selectedMaterial?.name}\n\n*Estimated Cost:* $${estimatedCost?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\nPlease contact me to proceed. Thank you!`;
      const encodedMessage = encodeURIComponent(message);
      const url = `https://wa.me/${companyPhone}?text=${encodedMessage}`;
      window.open(url, '_blank');
  };

  return (
    <section id="simulator" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-900 font-sans">
              {t('simulator.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('simulator.subtitle')}
            </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-xl sm:text-2xl font-semibold text-center text-brand-blue-800 mb-6">{currentStepTitle}</h3>
            
            {step === 1 && (
                <form onSubmit={handleUserInfoSubmit} className="text-center space-y-4 max-w-lg mx-auto">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left mb-1">{t('simulator.label_name')}</label>
                        <input type="text" name="name" id="name" value={userInfo.name} onChange={handleUserInfoChange} required className="w-full text-lg p-3 rounded-lg border-gray-300 focus:ring-brand-blue-500 focus:border-brand-blue-500" placeholder={t('simulator.placeholder_name')} />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-left mb-1">{t('simulator.label_phone')}</label>
                        <input type="tel" name="phone" id="phone" value={userInfo.phone} onChange={handleUserInfoChange} required className="w-full text-lg p-3 rounded-lg border-gray-300 focus:ring-brand-blue-500 focus:border-brand-blue-500" placeholder={t('simulator.placeholder_phone')} />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-left mb-1">{t('simulator.label_city')}</label>
                        <input type="text" name="city" id="city" value={userInfo.city} onChange={handleUserInfoChange} required className="w-full text-lg p-3 rounded-lg border-gray-300 focus:ring-brand-blue-500 focus:border-brand-blue-500" placeholder={t('simulator.placeholder_city')} />
                    </div>
                    <div>
                        <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 text-left mb-1">{t('simulator.label_neighborhood')}</label>
                        <input type="text" name="neighborhood" id="neighborhood" value={userInfo.neighborhood} onChange={handleUserInfoChange} className="w-full text-lg p-3 rounded-lg border-gray-300 focus:ring-brand-blue-500 focus:border-brand-blue-500" placeholder={t('simulator.placeholder_neighborhood')}/>
                    </div>
                    <div className="pt-4">
                        <button type="submit" className="px-8 py-3 text-base font-semibold text-white bg-brand-blue-600 rounded-lg shadow-md hover:bg-brand-blue-700 transition-all">{t('simulator.button_next_project')}</button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {projectTypes.map((pt) => {
                        const Icon = pt.icon;
                        return (
                            <button
                                key={pt.id}
                                onClick={() => handleProjectTypeSelect(pt)}
                                className="group p-6 text-center bg-white rounded-xl border-2 border-gray-200 hover:border-brand-blue-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
                            >
                                <Icon className="h-12 w-12 mx-auto text-brand-blue-500 group-hover:text-brand-blue-600 transition-colors" />
                                <p className="mt-4 font-semibold text-lg text-gray-800">{t(pt.id)}</p>
                            </button>
                        );
                    })}
                </div>
            )}

            {step === 3 && (
                <div className="text-center">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <div className="w-full sm:w-auto">
                            <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">{t('simulator.label_width')}</label>
                            <input type="number" name="width" id="width" value={dimensions.width} onChange={handleDimensionsChange} className="w-full text-center text-lg p-3 rounded-lg border-gray-300 focus:ring-brand-blue-500 focus:border-brand-blue-500" />
                        </div>
                        <span className="text-2xl font-light text-gray-400 mt-6 hidden sm:inline">×</span>
                        <div className="w-full sm:w-auto">
                            <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">{t('simulator.label_length')}</label>
                            <input type="number" name="length" id="length" value={dimensions.length} onChange={handleDimensionsChange} className="w-full text-center text-lg p-3 rounded-lg border-gray-300 focus:ring-brand-blue-500 focus:border-brand-blue-500" />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center gap-4">
                        <button onClick={() => setStep(2)} className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">{t('simulator.button_back')}</button>
                        <button onClick={() => setStep(4)} className="px-8 py-3 text-base font-semibold text-white bg-brand-blue-600 rounded-lg shadow-md hover:bg-brand-blue-700 transition-all">{t('simulator.button_next_material')}</button>
                    </div>
                </div>
            )}
            
            {step === 4 && selectedProjectType && (
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
                               <p className="font-semibold text-lg text-gray-800">{t(mat.id)}</p>
                               <p className="text-sm text-gray-500">${mat.costPerSqFt} / sq ft</p>
                             </div>
                           </button>
                        ))}
                    </div>
                     <div className="mt-8 flex justify-center gap-4">
                         <button onClick={() => setStep(3)} className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">{t('simulator.button_back')}</button>
                     </div>
                </div>
            )}

            {step === 5 && estimatedCost !== null && (
                <div>
                    <div id="printable-quote" className="text-left p-6 bg-white rounded-lg shadow-inner border border-gray-200">
                        <div className="flex justify-between items-start pb-4 border-b">
                            <div>
                                <h4 className="text-2xl font-bold text-brand-blue-800">DIAMOND Home Improvement</h4>
                                <p className="text-sm text-gray-500">{t('simulator.quote_title')}</p>
                            </div>
                            <p className="text-sm text-gray-500">{t('simulator.quote_date')}: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
                            <div>
                                <h5 className="font-semibold text-gray-700">{t('simulator.quote_prepared_for')}</h5>
                                <p className="text-gray-800">{userInfo.name}</p>
                                <p className="text-gray-600">{userInfo.phone}</p>
                                <p className="text-gray-600">{userInfo.neighborhood}, {userInfo.city}</p>
                            </div>
                            <div className="sm:text-right">
                                <p className="text-lg text-gray-600">{t('simulator.quote_estimated_cost')}</p>
                                <p className="text-4xl font-bold text-green-600">
                                    ${estimatedCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h5 className="font-semibold text-gray-700 mb-2">{t('simulator.quote_summary')}</h5>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-gray-50/80 rounded-md">
                                    <thead className="bg-gray-100">
                                        <tr className="text-left text-sm font-semibold text-gray-600">
                                            <th className="p-3">{t('simulator.quote_item')}</th>
                                            <th className="p-3">{t('simulator.quote_details')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        <tr className="border-t">
                                            <td className="p-3 font-medium">{t('simulator.quote_project_type')}</td>
                                            <td className="p-3">{selectedProjectType ? t(selectedProjectType.id) : ''}</td>
                                        </tr>
                                        <tr className="border-t bg-white">
                                            <td className="p-3 font-medium">{t('simulator.quote_dimensions')}</td>
                                            <td className="p-3">{dimensions.width} ft x {dimensions.length} ft ({parseFloat(dimensions.width) * parseFloat(dimensions.length)} sq ft)</td>
                                        </tr>
                                        <tr className="border-t">
                                            <td className="p-3 font-medium">{t('simulator.quote_material')}</td>
                                            <td className="p-3">{selectedMaterial ? t(selectedMaterial.id) : ''}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                         <p className="mt-8 text-xs text-gray-500 text-center">
                            {t('simulator.quote_disclaimer')}
                        </p>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 no-print">
                         <button onClick={resetSimulator} className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors w-full sm:w-auto">{t('simulator.button_start_over')}</button>
                        <button onClick={handlePrint} className="px-8 py-3 text-base font-semibold text-brand-blue-700 bg-brand-blue-100 border border-brand-blue-200 rounded-lg hover:bg-brand-blue-200 transition-all w-full sm:w-auto">
                            {t('simulator.button_print')}
                        </button>
                        <button onClick={handleWhatsApp} className="px-8 py-3 text-base font-semibold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition-all w-full sm:w-auto">
                            {t('simulator.button_whatsapp')}
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default Simulator;
