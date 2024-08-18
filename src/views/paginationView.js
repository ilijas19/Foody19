class PaginationView {
  _parentEl = document.querySelector(".all-recipes-wrapper");

  // Method to set up event listeners for the pagination buttons
  setPaginationListeners(handler) {
    const nextBtn = document.querySelector(".btn-next");
    const prevBtn = document.querySelector(".btn-prev");

    if (!this._parentEl) return;

    nextBtn.addEventListener("click", function () {
      handler("next");
    });
    prevBtn.addEventListener("click", function () {
      handler("prev");
    });
  }

  // Method to render the recipes on the page
  render(data) {
    this._data = data;
    this._clear(); // Clear the previous content
    this._data.forEach((recipe) => {
      this._parentEl.insertAdjacentHTML(
        "beforeend",
        this._generateMarkup(recipe.recipe)
      );
    });
  }

  // Method to generate the markup for each recipe
  _generateMarkup(recipe) {
    return `
      <div class="recipe">
        <img src="${recipe.image}" alt="" />
        <figcaption class="recipe-info">
          <p class="recipe-name">${recipe.label}</p>
          <button data-uri='${recipe.uri}' class="see-rec-btn">See recipe</button>
        </figcaption>
      </div>
    `;
  }

  // Method to clear the current content before rendering new content
  _clear() {
    this._parentEl.innerHTML = "";
  }
}

export default new PaginationView();
