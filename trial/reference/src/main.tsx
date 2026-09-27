import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/plus-jakarta-sans';
import '@ritam-ui/react/styles.css';
import App from './App';
import CompositionLab from './CompositionLab';
import './app.css';

const Screen = new URLSearchParams(window.location.search).get('view') === 'composition' ? CompositionLab : App;
createRoot(document.getElementById('root')!).render(<StrictMode><Screen /></StrictMode>);
