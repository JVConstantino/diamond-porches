import React from 'react';
import { AppContextProvider } from './context/AppContext';
import MainSite from './MainSite';
import ProtectedAdmin from './components/admin/ProtectedAdmin';
import CaseStudyDetailPage from './components/CaseStudyDetailPage';

const App: React.FC = () => {
  const [hash, setHash] = React.useState(window.location.hash);

  React.useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange, false);
    
    // Also handle initial load with hash
    setHash(window.location.hash);

    return () => {
      window.removeEventListener('hashchange', onHashChange, false);
    };
  }, []);

  const renderPage = () => {
    if (hash.startsWith('#/case-study/')) {
        const id = hash.split('/')[2];
        return <CaseStudyDetailPage caseStudyId={id} />;
    }
    
    // The footer link is just #admin. Admin panel can be #/admin or #admin
    if (hash.startsWith('#/admin') || hash === '#admin') {
        return <ProtectedAdmin />;
    }
    
    return <MainSite />;
  };

  return (
    <AppContextProvider>
      {renderPage()}
    </AppContextProvider>
  );
};

export default App;
