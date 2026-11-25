import {createRoot} from 'react-dom/client';
import {App} from './App';
import {site} from './content/site';
import './styles.css';

createRoot(document.getElementById('root')!).render(<App site={site} />);
