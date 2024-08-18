class MenuView {
  _parentEl = document.querySelector(".all-recipes-wrapper");
  _openBtn = document.querySelector(".filter-btn");
  _closeBtn = document.querySelector(".close-menu-btn");
  _title = document.querySelector(".all-recipes-heading");

  render(data) {
    this._data = data.recipes;
    this._changeTitle(data.currentQuery);
    this._clear();
    this._data.slice(0, 15).forEach((recipe) => {
      this._parentEl.insertAdjacentHTML(
        "beforeend",
        this._generateMarkup(recipe.recipe)
      );
    });
  }
  // EVENT LISTENERS FOR MEAL TYPE FILTER
  addMenuMealTypelisteners(handler) {
    const buttons = document.querySelectorAll(".meal-type-option");
    buttons.forEach((button) =>
      button.addEventListener("click", function (e) {
        const clickedButton = e.target.closest(".meal-type-option");
        const query = clickedButton.getAttribute("search-data");
        handler(query);
      })
    );
  }

  //EVENT LISTENERS FOR DISH FILTER
  addMenuDishListeners(handler) {
    const buttons = document.querySelectorAll(".dish-option");
    buttons.forEach((button) =>
      button.addEventListener("click", function (e) {
        const clickedButton = e.target.closest(".dish-option");
        const query = clickedButton.getAttribute("search-data");
        handler(query);
      })
    );
  }

  //EVENT LISTENERS FOR HEALTH  PREFERENCE FILTER
  addMenuHealthListeners(handler) {
    const buttons = document.querySelectorAll(".health-option");
    buttons.forEach((button) =>
      button.addEventListener("click", function (e) {
        const clickedButton = e.target.closest(".health-option");
        const query = clickedButton.getAttribute("search-data");
        handler(query);
      })
    );
  }

  addMenuCuisineListeners(handler) {
    const buttons = document.querySelectorAll(".cuisine-option");
    buttons.forEach((button) =>
      button.addEventListener("click", function (e) {
        const clickedButton = e.target.closest(".cuisine-option");
        const query = clickedButton.getAttribute("search-data");
        handler(query);
      })
    );
  }

  _changeTitle(searchQuery) {
    this._title.textContent = searchQuery.replace(
      searchQuery[0],
      searchQuery[0].toUpperCase()
    );
  }

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

  renderSpinner() {
    const spinerMarkup = `
    <i class="fa-solid fa-gear spinner-all-recipes"></i>
    
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("beforeend", spinerMarkup);
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  toggleMenu() {
    const menu = document.querySelector(".search-menu");

    const toggle = () => {
      // Toggle a class that controls the menu's visibility
      menu.classList.toggle("menu-open");
    };

    // Attach the event listeners
    this._openBtn.addEventListener("click", toggle);
    this._closeBtn.addEventListener("click", toggle);
  }

  toggleFilter() {
    const filters = document.querySelectorAll(".filter-visible");
    filters.forEach((filter) => {
      filter.addEventListener("click", function () {
        const clickedFilter = this;
        const filterOptions = clickedFilter.nextElementSibling;

        clickedFilter.classList.toggle("active-filter");

        // Toggle the visibility of filter options
        if (filterOptions.style.height === "auto") {
          filterOptions.style.display = "none";
          filterOptions.style.height = "0";
          filterOptions.style.opacity = "0";
          filterOptions.style.marginTop = "0";
        } else {
          filterOptions.style.display = "grid";
          filterOptions.style.height = "auto";
          filterOptions.style.opacity = "1";
          filterOptions.style.marginTop = "1rem";
        }
      });
    });
  }

  addMenuHandler(handler) {
    if (
      window.location.pathname === "/recipes.html" ||
      window.location.pathname === "/recipes"
    ) {
      handler();
    }
  }
}

export default new MenuView();
