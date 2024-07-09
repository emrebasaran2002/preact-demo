import { render } from 'preact';
import './index.css';
import App from './App.tsx';

const root = document.getElementById('app') as HTMLDivElement;
render(<App />, root);