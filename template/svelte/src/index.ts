import { mount } from 'svelte';
import App from './App.svelte';
import './index.css';

export default mount(App, {
  target: document.getElementById('root')!
});
