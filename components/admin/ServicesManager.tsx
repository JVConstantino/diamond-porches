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
        <div key={sectionKey} className="bg-white p-6 rounded-lg shadow-md">
            <div>
                <label className="text-sm font-medium text-gray-500">Section Title</label>
                <input
                    type="text"
                    value={section.title}
                    onChange={e => handleSectionTitleChange(sectionKey, e.target.value)}
                    className="w-full p-2 border rounded text-xl font-semibold text-brand-blue-800"
                />
            </div>

            <div className="mt-6 space-y-4">
                {section.services.map((service, index) => (
                    <div key={index} className="p-3 border rounded-md space-y-2">
                         <div>
                            <label className="text-xs font-medium text-gray-500">Service Name</label>
                            <input type="text" value={service.name} onChange={e => handleServiceChange(sectionKey, index, 'name', e.target.value)} className="w-full p-1 border rounded text-sm font-semibold"/>
                         </div>
                         <div>
                            <label className="text-xs font-medium text-gray-500">Description</label>
                            <textarea value={service.description} onChange={e => handleServiceChange(sectionKey, index, 'description', e.target.value)} rows={2} className="w-full p-1 border rounded text-sm"/>
                         </div>
                         <div>
                            <label className="text-xs font-medium text-gray-500">Icon</label>
                            <select value={service.icon} onChange={e => handleServiceChange(sectionKey, index, 'icon', e.target.value)} className="w-full p-1 border rounded text-sm">
                                {ICON_NAMES.map(name => <option key={name} value={name}>{name}</option>)}
                            </select>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Services</h1>
            <p className="text-sm text-gray-600 mb-6 -mt-4">Edit the content for each service listed on the site. Changes are saved automatically.</p>
            <div className="space-y-8">
                {renderSection('screenedPorch', servicesData.screenedPorch)}
                {renderSection('otherExterior', servicesData.otherExterior)}
            </div>
        </div>
    );
};

export default ServicesManager;
