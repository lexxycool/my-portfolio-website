import { useEffect, useState } from 'react';
import CloudHubHome from './components/CloudHubHome';
import CloudHubAbout from './components/CloudHubAbout';

function getCurrentPage() {
  return window.location.pathname === '/about' ? 'about' : 'home';
}

function App() {
  const [page, setPage] = useState(getCurrentPage());

  useEffect(() => {
    const onPopState = () => setPage(getCurrentPage());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (targetPage) => {
    const nextPath = targetPage === 'about' ? '/about' : '/';
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setPage(targetPage);
  };

  return (
    page === 'about' ? (
      <CloudHubAbout onNavigate={handleNavigate} />
    ) : (
      <CloudHubHome onNavigate={handleNavigate} />
    )
  );
}

export default App;
