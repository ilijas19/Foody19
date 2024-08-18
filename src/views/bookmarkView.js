class BookmarkView {
  _bookmarkBtn;
  _parentEl;
  _title;

  addBookmarkBtnHandler(handler) {
    this._bookmarkBtn = document.getElementById("bookmarks");
    const parentEl = document.querySelector(".all-recipes-wrapper");

    if (parentEl) {
      this._bookmarkBtn.style.opacity = "1";
      this._bookmarkBtn.addEventListener("click", () => {
        handler();
      });
    } else {
      this._bookmarkBtn.style.opacity = "0"; // Optionally hide the button if bookmarks can't be displayed
    }
  }

  renderBookmarks(data) {
    this._parentEl = document.querySelector(".all-recipes-wrapper");
    this._title = document.querySelector(".all-recipes-heading");
    this._clear();

    this._title.textContent = "Saved Recipes";
    this._hidePaginationBtns();
    if (data.length === 0) {
      this._title.textContent = "NO Saved Recipes";
    }
    data.forEach((recipe) => {
      this._parentEl.insertAdjacentHTML(
        "beforeend",
        this._generateBookmarkMarkup(recipe)
      );
    });

    // Add event listener to the parent element for event delegation
    this._addEventListeners();
  }

  _generateBookmarkMarkup(recipe) {
    return `
    <div class="recipe">
      <img src="${recipe.image}" alt="" />
      <figcaption class="recipe-info">
        <p class="recipe-name">${recipe.label}</p>
        <div class="bookmark-btn-div"></div>
        <button data-uri='${recipe.uri}' class="see-rec-btn">See recipe</button>
        <button data-uri='${recipe.uri}' class="remove-rec-btn">Remove</button>
      </figcaption>
    </div>
    `;
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  _hidePaginationBtns() {
    const paginationBtns = document.querySelectorAll(".pagination-btn");
    paginationBtns.forEach((btn) => {
      btn.style.display = "none";
    });
  }

  // Use event delegation to handle clicks on dynamically created buttons
  _addEventListeners() {
    this._parentEl.addEventListener("click", (e) => {
      const removeBtn = e.target.closest(".remove-rec-btn");
      const seeRecBtn = e.target.closest(".see-rec-btn");

      if (removeBtn) {
        const recipeUri = removeBtn.dataset.uri;
        this._handleRemove(recipeUri);
      }

      if (seeRecBtn) {
        const recipeUri = seeRecBtn.dataset.uri;
        this._handleSeeRecipe(recipeUri);
      }
    });
  }

  // Handlers to be passed to the controller
  _handleRemove(uri) {
    this._removeHandler(uri);
  }

  _handleSeeRecipe(uri) {
    this._seeRecipeHandler(uri);
  }

  addRemoveBtnListeners(handler) {
    this._removeHandler = handler;
  }

  addSeeRecipeBtnListeners(handler) {
    this._seeRecipeHandler = handler;
  }
}

export default new BookmarkView();
