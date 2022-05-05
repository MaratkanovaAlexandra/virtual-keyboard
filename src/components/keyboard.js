import Keys from '../helpers/keys';
import Key from './key';

class Keyboard {
  init(parentElement, lang) {
    parentElement.innerHTML += `
      <div>
        <h2 class="title">Virtual Keyboard</h2>
        <textarea id="screen"></textarea>
        <div id="keyboard"></div>
      </div>
    `;

    const keyboard = document.querySelector('#keyboard');

    Keys.forEach((i) => {
      const key = new Key(i.eng, i.rus, i.width, i.cssClass);
      key.init(keyboard, lang);
    });
  }
}

export default new Keyboard();
