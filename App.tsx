import React from 'react';
import { AppContextProvider } from './context/AppContext';
import MainSite from './MainSite';
import ProtectedAdmin from './components/admin/ProtectedAdmin';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  );
};

const Router: React.FC = () => {
  // Simple router based on hash
  const [hash, setHash] = React.useState(window.location.hash);

  React.useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  // Remove '#' and any leading '/' for a more robust path
  const path = hash.replace(/^#\/?/, '');

  if (path.startsWith('admin')) {
    return <ProtectedAdmin />;
  }
  
  return <MainSite />;
}

export default App;