import React from 'react';
import { AppContextProvider } from './context/AppContext';
import MainSite from './MainSite';
import AdminPanel from './components/admin/AdminPanel';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  );
};

const Router: React.FC = () => {
  // Simple router based on path
  const [pathname, setPathname] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    // Also handle manual navigation via history.pushState if needed in admin panel
    const handlePushState = () => setPathname(window.location.pathname);
    window.addEventListener('pushstate', handlePushState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('pushstate', handlePushState);
    };
  }, []);

  if (pathname.startsWith('/admin')) {
    return <AdminPanel />;
  }
  
  return <MainSite />;
}

export default App;
