import { useEffect, useState } from 'react';
import CloudHubHome from './components/CloudHubHome';
import CloudHubAbout from './components/CloudHubAbout';
import CloudHubProjects from './components/CloudHubProjects';
import CloudHubBlog from './components/CloudHubBlog';
import CloudHubLabs from './components/CloudHubLabs';

function getCurrentPage() {
  if (window.location.pathname === '/about') {
    return 'about';
  }

  if (window.location.pathname === '/projects') {
    return 'projects';
  }

  if (window.location.pathname === '/blog') {
    return 'blog';
  }

  if (window.location.pathname === '/labs') {
    return 'labs';
  }

  return 'home';
}

function App() {
  const [page, setPage] = useState(getCurrentPage());

  useEffect(() => {
    const onPopState = () => setPage(getCurrentPage());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (targetPage) => {
    const nextPath =
      targetPage === 'about'
        ? '/about'
        : targetPage === 'projects'
          ? '/projects'
          : targetPage === 'blog'
            ? '/blog'
            : targetPage === 'labs'
              ? '/labs'
            : '/';
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setPage(targetPage);
  };

  return (
    page === 'about' ? (
      <CloudHubAbout onNavigate={handleNavigate} />
    ) : page === 'projects' ? (
      <CloudHubProjects onNavigate={handleNavigate} />
    ) : page === 'blog' ? (
      <CloudHubBlog onNavigate={handleNavigate} />
    ) : page === 'labs' ? (
      <CloudHubLabs onNavigate={handleNavigate} />
    ) : (
      <CloudHubHome onNavigate={handleNavigate} />
    )
  );
}

export default App;
