
import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-brand-blue-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-sans">
            Trusted by Homeowners Like You
          </h2>
          <p className="mt-4 text-lg text-blue-200">
            Don't just take our word for it. Here's what our satisfied customers have to say.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-brand-blue-900 p-8 rounded-xl shadow-lg flex flex-col">
              <div className="flex-grow">
                <svg className="w-10 h-10 text-brand-blue-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 11a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM15 11a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM8 6a1 1 0 00-1 1v1a1 1 0 002 0V7a1 1 0 00-1-1zM12 6a1 1 0 00-1 1v1a1 1 0 002 0V7a1 1 0 00-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                <p className="text-blue-100 italic">"{testimonial.quote}"</p>
              </div>
              <div className="mt-6 pt-6 border-t border-brand-blue-800 flex items-center">
                <img className="h-12 w-12 rounded-full object-cover" src={testimonial.avatarUrl} alt={testimonial.author} />
                <div className="ml-4">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-blue-300">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
