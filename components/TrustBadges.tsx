import React from 'react';
import { useTranslations } from '../context/LanguageProvider';

const BBBLogo = () => (
    <svg className="h-12 text-gray-500" role="img" viewBox="0 0 256 256"><path fill="currentColor" d="M165.8 80.3h18.3v95.4h-18.3zm-30.6 47.7c0-21.3 14-36.2 34.6-36.2h14.3v-14h-13.8c-14.8 0-25.1 8.2-25.1 22.1v2.3h-10v95.4h10zm-49.4-47.7c0-21.3 14-36.2 34.6-36.2h14.3v-14H121c-14.8 0-25.1 8.2-25.1 22.1v2.3h-10v95.4h10zM227.1 0H28.9C12.9 0 0 12.9 0 28.9v198.3C0 243.1 12.9 256 28.9 256h198.3c15.9 0 28.9-12.9 28.9-28.9V28.9C256 12.9 243.1 0 227.1 0m-24.9 144.1c0-29.2-21-49-51.4-49h-18.3v99.5h18.3c30.4 0 51.4-19.8 51.4-49zm-61.1 0c0-29.2-21-49-51.4-49H71.4v99.5h18.3c30.4.1 51.4-19.7 51.4-49z"></path></svg>
);

const HomeAdvisorLogo = () => (
    <svg className="h-12 text-gray-500" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2.66663L3.33331 10V29.3333H28.6666V10L16 2.66663Z" fill="#F7941E"/>
        <path d="M16 2.66663L3.33331 10V29.3333H16V2.66663Z" fill="#F47B20"/>
        <path d="M22.6667 22.6667H9.33337C9.33337 22.6667 10.1334 16.8 16.0001 16.8C21.8667 16.8 22.6667 22.6667 22.6667 22.6667Z" fill="#FFFFFF"/>
        <path d="M16 16.8C10.1333 16.8 9.33329 22.6667 9.33329 22.6667H16V16.8Z" fill="#E6E7E8"/>
    </svg>
);

const AngiLogo = () => (
    <svg className="h-8 text-gray-500" viewBox="0 0 100 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 34.02V0.98H8.28L20.8 21.46V0.98H28.2V34.02H19.92L7.4 13.54V34.02H0Z" fill="currentColor"/>
      <path d="M49.61 34.02V0.98H57.01V34.02H49.61Z" fill="currentColor"/>
      <path d="M63.73 34.02V0.98H71.13V26.98L81.25 0.98H89.41L76.57 34.02H63.73Z" fill="currentColor"/>
      <path d="M92.6 17.5C92.6 26.56 99.64 35 108.7 35C117.76 35 124.8 26.56 124.8 17.5C124.8 8.44 117.76 0 108.7 0C99.64 0 92.6 8.44 92.6 17.5ZM117.4 17.5C117.4 22.84 113.68 27.92 108.7 27.92C103.72 27.92 100 22.84 100 17.5C100 12.16 103.72 7.08 108.7 7.08C113.68 7.08 117.4 12.16 117.4 17.5Z" fill="currentColor" transform="translate(-25)"/>
    </svg>
);


const TrustBadges: React.FC = () => {
  const { t } = useTranslations();
  return (
    <div className="bg-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-gray-600">
          {t('trust.title')}
        </h2>
        <div className="mt-8 flow-root">
            <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-4 sm:gap-x-10 lg:mx-0 lg:max-w-none">
              <div className="flex justify-center items-center">
                <BBBLogo />
              </div>
              <div className="flex justify-center items-center">
                <HomeAdvisorLogo />
              </div>
              <div className="flex justify-center items-center">
                <AngiLogo />
              </div>
              <div className="flex justify-center items-center text-center">
                <div className="text-gray-500">
                    <p className="font-bold text-xl">5-Year</p>
                    <p className="text-sm">{t('trust.warranty')}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
