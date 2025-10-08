import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useTranslations } from '../context/LanguageProvider';

const CaseStudies: React.FC = () => {
  const { caseStudies } = useAppContext();
  const { t } = useTranslations();

  return (
    <>
      <section id="casestudies" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-900 font-sans">
              {t('casestudies.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('casestudies.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="group bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative">
                  <a href={`/#/case-study/${study.id}`}>
                    <img src={study.mainImage} alt={t(`caseStudy.${study.id}.title`)} className="w-full h-56 object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-colors duration-300"></div>
                  </a>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-brand-blue-600 font-semibold uppercase tracking-wide">{t(study.projectType)}</p>
                  <h3 className="mt-2 text-xl font-bold text-gray-800">{t(`caseStudy.${study.id}.title`)}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t(`caseStudy.${study.id}.location`)}</p>
                  <div className="flex-grow mt-4"></div> {/* Spacer */}
                  <a href={`/#/case-study/${study.id}`} className="self-start inline-block px-5 py-2 text-sm font-semibold text-white bg-brand-blue-600 rounded-lg shadow-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 transition-all duration-300">
                    {t('casestudies.view_project')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
