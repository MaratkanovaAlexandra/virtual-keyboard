function active(keys, code) {
  let element = null;
  keys.forEach((key) => {
    if (key.classList.contains(code)) {
      key.classList.add('active');
      element = key;
    }
  });
  return element;
}

class Events {
  constructor() {
    this.lang = 'eng';
    this.ctrl = false;
    this.alt = false;
    this.shift = false;
    this.caps = false;
    this.shidtKey = null;
    this.capsPress = false;
  }

  capsOn(element) {
    this.caps = !this.caps;
    const letterVariants = document.querySelectorAll('.variant');

    if (this.caps) {
      if (this.shift) {
        letterVariants.forEach((i) => {
          if (i.classList.contains('shift-caps')) i.classList.remove('hidden');
          else i.classList.add('hidden');
        });
      } else {
        letterVariants.forEach((i) => {
          if (i.classList.contains('caps')) i.classList.remove('hidden');
          else i.classList.add('hidden');
        });
      }
    } else {
      element.classList.remove('active');
      if (this.shift) {
        letterVariants.forEach((i) => {
          if (i.classList.contains('shift')) i.classList.remove('hidden');
          else i.classList.add('hidden');
        });
      } else {
        letterVariants.forEach((i) => {
          if (i.classList.contains('normal')) i.classList.remove('hidden');
          else i.classList.add('hidden');
        });
      }
    }
  }

  shiftOn(code) {
    this.shidtKey = code;
    this.shift = true;
    const letterVariants = document.querySelectorAll('.variant');

    if (this.caps) {
      letterVariants.forEach((i) => {
        if (i.classList.contains('shift-caps')) i.classList.remove('hidden');
        else i.classList.add('hidden');
      });
    } else {
      letterVariants.forEach((i) => {
        if (i.classList.contains('shift')) i.classList.remove('hidden');
        else i.classList.add('hidden');
      });
    }
  }

  shiftOff() {
    this.shidtKey = null;
    this.shift = false;
    const letterVariants = document.querySelectorAll('.variant');

    if (this.caps) {
      letterVariants.forEach((i) => {
        if (i.classList.contains('caps')) i.classList.remove('hidden');
        else i.classList.add('hidden');
      });
    } else {
      letterVariants.forEach((i) => {
        if (i.classList.contains('normal')) i.classList.remove('hidden');
        else i.classList.add('hidden');
      });
    }
  }

  changeLang(keys) {
    if (this.lang === 'eng') this.lang = 'rus';
    else this.lang = 'eng';

    localStorage.removeItem('lang');
    localStorage.setItem('lang', this.lang);

    keys.forEach((i) => {
      Array.from(i.children).forEach((j) => {
        if (j.classList.contains(this.lang)) j.classList.remove('hidden');
        else j.classList.add('hidden');
      });
    });
  }

  specialKeyEvents(code, keyEl, keys) {
    if (code === 'CapsLock') {
      if (!this.capsPress) {
        this.capsPress = true;
        this.capsOn(keyEl);
      }
      return true;
    }
    if (code === 'ControlLeft' || code === 'ControlRight') {
      if (!this.ctrl) {
        this.ctrl = true;
        if (this.alt && this.ctrl) this.changeLang(keys);
      }
      return true;
    }
    if (code === 'AltLeft' || code === 'AltRight') {
      if (!this.alt) {
        this.alt = true;
        if (this.alt && this.ctrl) this.changeLang(keys);
      }
      return true;
    }
    return false;
  }

  additionalKeyEvents(code, screen, index) {
    let dontPrint = false;
    if (code === 'Tab') {
      dontPrint = true;
      screen.value = `${screen.value.substring(0, index)}    ${screen.value.substring(index)}`;
      screen.selectionEnd = index + 4;
    }
    if (code === 'Backspace') {
      dontPrint = true;
      screen.value = `${screen.value.substring(0, index - 1)}${screen.value.substring(index)}`;
      screen.selectionEnd = index - 1;
    }
    if (code === 'Delete') {
      dontPrint = true;
      screen.value = `${screen.value.substring(0, index)}${screen.value.substring(index + 1)}`;
      screen.selectionEnd = index;
    }
    if (code === 'Enter') {
      dontPrint = true;
      screen.value = `${screen.value.substring(0, index)}\n${screen.value.substring(index + 1)}`;
      screen.selectionEnd = index + 1;
    }

    return dontPrint;
  }

  keydown() {
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (this.shidtKey === 'ShiftLeft' && e.code === 'ShiftRight') return;
      if (this.shidtKey === 'ShiftRight' && e.code === 'ShiftLeft') return;

      const keys = Array.from(document.querySelectorAll('.key'));
      const screen = document.querySelector('#screen');
      const index = screen.selectionEnd;

      const keyEl = active(keys, e.code);
      if (!keyEl) return;

      const dontPrintSpecialKey = this.specialKeyEvents(e.code, keyEl, keys);
      const dontPrintAdditionalKey = this.additionalKeyEvents(e.code, screen, index);
      if (dontPrintSpecialKey || dontPrintAdditionalKey) return;

      if (e.shiftKey && !this.shift) this.shiftOn(e.code);

      const letters = Array.from(keyEl.children)
        .filter((i) => i.classList.contains(this.lang))[0].children;
      const letter = Array.from(letters).filter((i) => !i.classList.contains('hidden'))[0].innerHTML;

      if (letter === 'Shift') return;

      screen.value = `${screen.value.substring(0, index)}${letter[0]}${screen.value.substring(index)}`;
      screen.selectionEnd = index + 1;
    });
  }

  keyup() {
    window.addEventListener('keyup', (e) => {
      const keys = Array.from(document.querySelectorAll('.key'));

      if (e.code === 'CapsLock') {
        this.capsPress = false;
        return;
      }
      if (e.code === 'ControlLeft' || e.code === 'ControlRight') this.ctrl = false;
      if (e.code === 'AltLeft' || e.code === 'AltRight') this.alt = false;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        if (this.shidtKey === e.code && this.shift) this.shiftOff();
      }

      keys.forEach((key) => {
        if (key.classList.contains(e.code)) key.classList.remove('active');
      });
    });
  }

  mousedown() {
    window.addEventListener('mousedown', (e) => {
      const key = e.target.closest('.key');
      if (!key) return;
      if (this.shidtKey === 'ShiftLeft' && key.classList.contains('ShiftRight')) return;
      if (this.shidtKey === 'ShiftRight' && key.classList.contains('ShiftLeft')) return;
      key.classList.add('active');

      const keys = Array.from(document.querySelectorAll('.key'));
      const screen = document.querySelector('#screen');
      screen.focus();
      const index = screen.selectionEnd;

      const dontPrintSpecialKey = this.specialKeyEvents(key.classList[1], key, keys);
      const dontPrintAdditionalKey = this.additionalKeyEvents(key.classList[1], screen, index);

      if (dontPrintSpecialKey || dontPrintAdditionalKey) return;

      if ((key.classList.contains('ShiftLeft') || key.classList.contains('ShiftRight')) && !this.shift) this.shiftOn(key.classList[1]);

      const letters = Array.from(key.children)
        .filter((i) => i.classList.contains(this.lang))[0].children;
      const letter = Array.from(letters).filter((i) => !i.classList.contains('hidden'))[0].innerHTML;

      if (letter === 'Shift') return;

      screen.value = `${screen.value.substring(0, index)}${letter[0]}${screen.value.substring(index)}`;
      screen.selectionEnd = index + 1;
    });
  }

  mouseup() {
    window.addEventListener('mouseup', (e) => {
      const key = e.target.closest('.key');
      const keys = Array.from(document.querySelectorAll('.key'));

      if (!key || key.classList.contains('CapsLock')) {
        this.capsPress = false;
        return;
      }
      if (key.classList.contains('ControlLeft') || key.classList.contains('ControlRight')) this.ctrl = false;
      if (key.classList.contains('AltLeft') || key.classList.contains('AltRight')) this.alt = false;
      if (key.classList.contains('ShiftLeft') || key.classList.contains('ShiftRight')) {
        if (this.shidtKey === key.classList[1] && this.shift) this.shiftOff();
      }

      keys.forEach((i) => {
        if (i.classList.contains('CapsLock')) return;
        i.classList.remove('active');
      });
    });
  }
}

export default Events;
