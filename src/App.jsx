import { useEffect, useState } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';
import CloudHubHome from './components/CloudHubHome';
import CloudHubAbout from './components/CloudHubAbout';
import CloudHubProjects from './components/CloudHubProjects';
import CloudHubBlog from './components/CloudHubBlog';
import CloudHubLabs from './components/CloudHubLabs';
import CloudHubResume from './components/CloudHubResume';
import CloudHubAdmin from './components/CloudHubAdmin';
import CloudHubContact from './components/CloudHubContact';
import CloudHubSignIn from './components/CloudHubSignIn';
import { loadSiteContent, saveSiteContent } from './components/cloudhub/content/siteContentStore';

function getCurrentPage() {
  if (typeof window !== 'undefined' && (window.location.hash.includes('code=') || window.location.hash.includes('state='))) {
    return 'admin';
  }

  if (window.location.pathname === '/about') {
    return 'about';
  }

  if (window.location.pathname === '/projects') {
    return 'projects';
  }

  if (window.location.pathname === '/blog' || window.location.pathname.startsWith('/blog/')) {
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

  if (window.location.pathname === '/signin') {
    return 'signin';
  }

  return 'home';
}

function App() {
  const [page, setPage] = useState(getCurrentPage());
  const [, setNavigationVersion] = useState(0);
  const [siteContent, setSiteContent] = useState(loadSiteContent);
  const { instance } = useMsal();
  const isMsalAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const onPopState = () => {
      setPage(getCurrentPage());
      setNavigationVersion((version) => version + 1);
    };
    window.addEventListener('popstate', onPopState);

    if (window.location.hash.includes('code=') || window.location.hash.includes('state=')) {
      window.history.replaceState({}, '', '/admin');
      setPage('admin');
    }

    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        if (event.payload?.account) {
          instance.setActiveAccount(event.payload.account);
        }
        window.history.pushState({}, '', '/admin');
        setPage('admin');
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  useEffect(() => {
    if (page === 'signin' && isMsalAuthenticated) {
      window.history.replaceState({}, '', '/admin');
      setPage('admin');
    }
  }, [page, isMsalAuthenticated]);

  const handleNavigate = (targetPage, articleSlug) => {
    const nextPath =
      targetPage === 'about'
        ? '/about'
        : targetPage === 'projects'
          ? '/projects'
          : targetPage === 'blog'
            ? articleSlug
              ? `/blog/${encodeURIComponent(articleSlug)}`
              : '/blog'
            : targetPage === 'labs'
              ? '/labs'
            : targetPage === 'resume'
              ? '/resume'
            : targetPage === 'admin'
              ? '/admin'
            : targetPage === 'contact'
              ? '/contact'
            : targetPage === 'signin'
              ? '/signin'
            : '/';
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setPage(targetPage);
    setNavigationVersion((version) => version + 1);
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
      <CloudHubBlog
        onNavigate={handleNavigate}
        siteContent={siteContent}
        articleSlug={decodeURIComponent(window.location.pathname.split('/').filter(Boolean)[1] || '')}
      />
    ) : page === 'labs' ? (
      <CloudHubLabs onNavigate={handleNavigate} siteContent={siteContent} />
    ) : page === 'resume' ? (
      <CloudHubResume onNavigate={handleNavigate} siteContent={siteContent} />
    ) : page === 'admin' ? (
      <CloudHubAdmin onNavigate={handleNavigate} siteContent={siteContent} onSaveContent={handleSaveContent} />
    ) : page === 'contact' ? (
      <CloudHubContact onNavigate={handleNavigate} />
    ) : page === 'signin' ? (
      isMsalAuthenticated ? (
        <CloudHubAdmin onNavigate={handleNavigate} siteContent={siteContent} onSaveContent={handleSaveContent} />
      ) : (
        <CloudHubSignIn onNavigate={handleNavigate} />
      )
    ) : (
      <CloudHubHome onNavigate={handleNavigate} siteContent={siteContent} />
    )
  );
}

export default App;
