import './style.css';

import Keyboard from './components/keyboard';
import Events from './components/events';

const events = new Events();

let lang = localStorage.getItem('lang');
if (!lang) {
  localStorage.setItem('lang', 'eng');
  lang = 'eng';
}

Keyboard.init(document.body, lang);
