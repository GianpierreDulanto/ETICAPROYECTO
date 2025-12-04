import logo from './logo.svg';
import './App.css';
import ANMIChatbot from './ANMIChatbot';
import { useEffect, useState } from 'react';

function App() {
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);
  const [estaOffline, setEstaOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      console.log('👍', "beforeinstallprompt", event);
      window.deferredPrompt = event;
      setIsReadyForInstall(true);
    });

    const handleOnline = () => setEstaOffline(false);
    const handleOffline = () => setEstaOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  async function downloadApp() {
    console.log('👍', "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      console.log("oops, no prompt event guardado");
      return;
    }
    promptEvent.prompt();
    const { result } = await promptEvent.userChoice;
    console.log('👍', "userChoice", result);
    window.deferredPrompt = null;
    setIsReadyForInstall(false);
  }

  return (
    <div>
      <ANMIChatbot estaOffline={estaOffline} />
    </div>
  );
}

export default App;
