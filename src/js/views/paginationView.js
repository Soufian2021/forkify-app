import icons from 'url:../../img/icons.svg'; // Parcel 2
import View from './View';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);

      // Another way to get the goToPage (mine)
      // const btnText = btn.querySelector('span').textContent;
      // const goToPage = parseInt(btnText.slice(-1));
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;

    // Page 1, there are other pages
    if (curPage === 1 && numPages > 1)
      return this._generateMarkupButton('next', curPage);

    // Last page
    if (curPage === numPages && numPages > 1)
      return this._generateMarkupButton('prev', curPage);

    // Other page
    if (curPage < numPages)
      return `${this._generateMarkupButton(
        'prev',
        curPage
      )}${this._generateMarkupButton('next', curPage)}`;

    // Page 1, there are NO other pages
    return '';
  }

  _generateMarkupButton(direction, curPage) {
    return `
      <button data-goto="${
        direction === 'next' ? curPage + 1 : curPage - 1
      }" class="btn--inline pagination__btn--${direction}">
        ${direction === 'next' ? `<span>Page ${curPage + 1}</span>` : ''}
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${
      direction === 'next' ? 'right' : 'left'
    }"></use>
        </svg>
        ${direction === 'prev' ? `<span>Page ${curPage - 1}</span>` : ''}
      </button>
    `;
  }
}

export default new PaginationView();
