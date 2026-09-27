import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/plus-jakarta-sans';
import '@ritam-ui/react/styles.css';
import App from './App';
import CompositionLab from './CompositionLab';
import Catalogue from './catalogue/Catalogue';
import './app.css';

const view = new URLSearchParams(window.location.search).get('view');
const Screen = view === 'catalogue' ? Catalogue : view === 'composition' ? CompositionLab : App;
createRoot(document.getElementById('root')!).render(<StrictMode><Screen /></StrictMode>);
