import './App.css';
import ANMIChatbot from './ANMIChatbot';
import { useEffect, useState } from 'react';

function App() {
  const [estaOffline, setEstaOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      console.log('👍', "beforeinstallprompt", event);
      window.deferredPrompt = event;
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

  return (
    <div>
      <ANMIChatbot estaOffline={estaOffline} />
    </div>
  );
}

export default App;
