
import React, { useState } from 'react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimate: number | null;
  projectDetails: {
    type?: string;
    material?: string;
    dimensions?: string;
  }
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, estimate, projectDetails }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-auto transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-brand-blue-900 font-sans">
                  {submitted ? 'Thank You!' : 'Lock In Your Estimate'}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
          
            {submitted ? (
              <div className="text-center py-10">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="text-lg text-gray-700">Your request has been sent successfully.</p>
                <p className="mt-2 text-gray-500">Our team will contact you within 24 hours to schedule a detailed consultation. </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2 text-sm font-semibold text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
            <>
                <p className="mt-2 text-gray-600">
                    Complete the form below and one of our project specialists will contact you to confirm details and schedule a free, no-obligation site visit.
                </p>

                <div className="my-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-800">Your Project Summary</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li><strong>Project:</strong> {projectDetails.type}</li>
                        <li><strong>Material:</strong> {projectDetails.material}</li>
                        <li><strong>Dimensions:</strong> {projectDetails.dimensions} ft</li>
                        <li className="font-bold text-base text-green-600"><strong>Estimate:</strong> ${estimate?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</li>
                    </ul>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500" />
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" name="phone" id="phone" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500" />
                    </div>
                    <div className="pt-4">
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-brand-blue-600 hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 transition-all">
                        Schedule My Consultation
                        </button>
                    </div>
                </form>
            </>
            )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
