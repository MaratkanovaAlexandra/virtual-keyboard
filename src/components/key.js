class Key {
  constructor(eng, rus, width, cssClass) {
    this.eng = eng;
    this.rus = rus;
    this.width = width;
    this.cssClass = cssClass;
  }

  init(parentElement, lang) {
    parentElement.innerHTML += `
      <button class="key ${this.cssClass}" style="width: ${this.width}px">
        <span class="eng ${lang === 'eng' ? '' : 'hidden'}">
          <span class="variant normal">${this.eng.normal}</span>
          <span class="variant shift hidden">${this.eng.shift}</span>
          <span class="variant caps hidden">${this.eng.caps}</span>
          <span class="variant shift-caps hidden">${this.eng.normal === this.eng.caps ? this.eng.shift : this.eng.normal}</span>
        </span>
        <span class="rus ${lang === 'rus' ? '' : 'hidden'}">
          <span class="variant normal">${this.rus.normal}</span>
          <span class="variant shift hidden">${this.rus.shift}</span>
          <span class="variant caps hidden">${this.rus.caps}</span>
          <span class="variant shift-caps hidden">${this.rus.normal === this.rus.caps ? this.rus.shift : this.rus.normal}</span>
        </span>
      </button>
    `;
  }
}

export default Key;
