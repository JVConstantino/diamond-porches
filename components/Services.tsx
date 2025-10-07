import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ICON_MAP } from '../constants';
import type { Service } from '../types';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
    const Icon = ICON_MAP[service.icon] || ICON_MAP['CubeIcon']; // Fallback icon
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-blue-100 mb-4">
                <Icon className="h-6 w-6 text-brand-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-brand-blue-900 mb-2">{service.name}</h4>
            <p className="text-gray-600 text-sm">{service.description}</p>
        </div>
    );
};


const Services: React.FC = () => {
    const { servicesData } = useAppContext();
    
    return (
        <section id="services" className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-900 font-sans">
                        Comprehensive Exterior Solutions
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        From stunning screened porches to durable siding, we offer a wide range of services to enhance your home.
                    </p>
                </div>
                
                <div className="mt-12 space-y-12">
                    {/* Screened Porch Services */}
                    <div>
                        <h3 className="text-2xl font-bold text-brand-blue-800 mb-6 text-center sm:text-left">
                           {servicesData.screenedPorch.title}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                           {servicesData.screenedPorch.services.map(service => (
                               <ServiceCard key={service.name} service={service} />
                           ))}
                        </div>
                    </div>

                    {/* Other Exterior Services */}
                    <div>
                        <h3 className="text-2xl font-bold text-brand-blue-800 mb-6 text-center sm:text-left">
                            {servicesData.otherExterior.title}
                        </h3>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                           {servicesData.otherExterior.services.map(service => (
                               <ServiceCard key={service.name} service={service} />
                           ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Services;
