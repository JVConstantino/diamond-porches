import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ICON_NAMES } from '../../constants';
import type { Service, ServiceSection } from '../../types';

const ServicesManager: React.FC = () => {
    const { servicesData, setServicesData } = useAppContext();

    const handleSectionTitleChange = (sectionKey: keyof typeof servicesData, title: string) => {
        setServicesData(prev => ({
            ...prev,
            [sectionKey]: { ...prev[sectionKey], title }
        }));
    };
    
    const handleServiceChange = (sectionKey: keyof typeof servicesData, serviceIndex: number, field: keyof Service, value: string) => {
        setServicesData(prev => {
            const updatedServices = [...prev[sectionKey].services];
            updatedServices[serviceIndex] = { ...updatedServices[serviceIndex], [field]: value };
            return {
                ...prev,
                [sectionKey]: { ...prev[sectionKey], services: updatedServices }
            };
        });
    };

    const renderSection = (sectionKey: keyof typeof servicesData, section: ServiceSection) => (
        <div key={sectionKey} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div>
                <label className="text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <input
                    type="text"
                    value={section.title}
                    onChange={e => handleSectionTitleChange(sectionKey, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-xl font-semibold text-brand-blue-800"
                />
            </div>

            <div className="mt-6 space-y-4">
                {section.services.map((service, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-md space-y-3 bg-gray-50/50">
                         <div>
                            <label className="text-xs font-medium text-gray-500 mb-1">Service Name</label>
                            <input type="text" value={service.name} onChange={e => handleServiceChange(sectionKey, index, 'name', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm font-semibold"/>
                         </div>
                         <div>
                            <label className="text-xs font-medium text-gray-500 mb-1">Description</label>
                            <textarea value={service.description} onChange={e => handleServiceChange(sectionKey, index, 'description', e.target.value)} rows={2} className="w-full p-2 border border-gray-300 rounded-md text-sm"/>
                         </div>
                         <div>
                            <label className="text-xs font-medium text-gray-500 mb-1">Icon</label>
                            <select value={service.icon} onChange={e => handleServiceChange(sectionKey, index, 'icon', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm">
                                {ICON_NAMES.map(name => <option key={name} value={name}>{name}</option>)}
                            </select>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Manage Services</h1>
            <p className="text-gray-600 -mt-6">Edit the content for each service listed on the site. Changes are saved automatically.</p>
            
            {renderSection('screenedPorch', servicesData.screenedPorch)}
            {renderSection('otherExterior', servicesData.otherExterior)}
        </div>
    );
};

export default ServicesManager;