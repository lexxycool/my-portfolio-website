import { useEffect, useState } from 'react';
import CloudHubHome from './components/CloudHubHome';
import CloudHubAbout from './components/CloudHubAbout';
import CloudHubProjects from './components/CloudHubProjects';
import CloudHubBlog from './components/CloudHubBlog';
import CloudHubLabs from './components/CloudHubLabs';
import CloudHubResume from './components/CloudHubResume';
import CloudHubAdmin from './components/CloudHubAdmin';
import CloudHubContact from './components/CloudHubContact';
import { loadSiteContent, saveSiteContent } from './components/cloudhub/content/siteContentStore';

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

  if (window.location.pathname === '/resume') {
    return 'resume';
  }

  if (window.location.pathname === '/admin') {
    return 'admin';
  }

  if (window.location.pathname === '/contact') {
    return 'contact';
  }

  return 'home';
}

function App() {
  const [page, setPage] = useState(getCurrentPage());
  const [siteContent, setSiteContent] = useState(loadSiteContent);

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
            : targetPage === 'resume'
              ? '/resume'
            : targetPage === 'admin'
              ? '/admin'
            : targetPage === 'contact'
              ? '/contact'
            : '/';
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setPage(targetPage);
  };

  const handleSaveContent = (nextContent) => {
    saveSiteContent(nextContent);
    setSiteContent(nextContent);
  };

  return (
    page === 'about' ? (
      <CloudHubAbout onNavigate={handleNavigate} />
    ) : page === 'projects' ? (
      <CloudHubProjects onNavigate={handleNavigate} siteContent={siteContent} />
    ) : page === 'blog' ? (
      <CloudHubBlog onNavigate={handleNavigate} siteContent={siteContent} />
    ) : page === 'labs' ? (
      <CloudHubLabs onNavigate={handleNavigate} siteContent={siteContent} />
    ) : page === 'resume' ? (
      <CloudHubResume onNavigate={handleNavigate} siteContent={siteContent} />
    ) : page === 'admin' ? (
      <CloudHubAdmin onNavigate={handleNavigate} siteContent={siteContent} onSaveContent={handleSaveContent} />
    ) : page === 'contact' ? (
      <CloudHubContact onNavigate={handleNavigate} />
    ) : (
      <CloudHubHome onNavigate={handleNavigate} siteContent={siteContent} />
    )
  );
}

export default App;
