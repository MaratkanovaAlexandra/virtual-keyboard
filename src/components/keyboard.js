import Keys from '../helpers/keys';
import Key from './key';

class Keyboard {
  init(parentElement, lang) {
    parentElement.innerHTML += `
      <div>
        <h2 class="title">Virtual Keyboard</h2>
        <textarea id="screen"></textarea>
        <div id="keyboard"></div>
        <p class="discription">Keyboard is created for Windows</p>
        <p class="discription">Ctrl + Alt to change language</p>
        <p class="discription">
          If you press one Shift key second will be disabled.
          I did this 'cos Windows don't trigger keyup event if both Shift Keys are pressed.
         </p>
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
