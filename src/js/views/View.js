import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g recipe)
   * @param {boolean} [render=true]  If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if data=false
   * @this {Object} View instance
   * @author Soufyan Laarif
   * @todo Finish some more stuff ...
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    // The render() method was designed to return a string if render argument is false
    // So, the render() method calls the _generateMarkup() method of the previewView, and it returns that markup, instead of rendering it in the UI
    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  // DOM Updating algorithm (not robust)
  // The update() method contains the DOM-updating algorithm — a set of steps that a program needs to follow in order to update the DOM without refreshing //the whole page, but there is nothing special about it. It's still just some JavaScript code wrapped in a method.
  update(data) {
    // No need to this line because it's shows an error message in results view after reloading the page, and it's not a convenient message
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    // Create a DOM (virtual dom)
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // isEqualNode() compares the content and characteristic of the nodes, but it doesn't check if it's exactly the same node (object).
      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== '' // It's to filter the elements which don't contain text nodes as first child. The nodeValue of such elements will be a string consisting of white space
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
