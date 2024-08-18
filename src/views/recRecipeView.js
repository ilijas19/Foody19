class RecommendedRecipeView {
  _parentEl = document.querySelector(".rec-recipes");

  renderSpinner() {
    const spinerMarkup = '<i class="fa-solid fa-gear spinner"></i>';
    this._clear();
    this._parentEl.insertAdjacentHTML("beforeend", spinerMarkup);
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  render(data) {
    this._data = data;
    this._clear();
    this._data.slice(0, 8).forEach((recipe) => {
      this._parentEl.insertAdjacentHTML(
        "beforeend",
        this._generateMarkup(recipe.recipe)
      );
    });
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

  _removeActiveClass() {
    const menuItems = document.querySelectorAll(".rec-meals-item");
    menuItems.forEach((menuItem) => {
      menuItem.classList.remove("selected-rec-meal");
    });
  }

  _setActiveClass(element) {
    element.classList.add("selected-rec-meal");
  }

  addMenuListeners(handler) {
    document.addEventListener("DOMContentLoaded", () => {
      if (
        window.location.pathname === "/index.html" ||
        window.location.pathname === "/"
      ) {
        // console.log("MENU EVENTS ADDED");
        const menuItems = document.querySelectorAll(".rec-meals-item");
        menuItems.forEach((menuItem) =>
          menuItem.addEventListener("click", (e) => {
            const clickedBtn = e.target.closest(".rec-meals-item");
            const clickedBtnValue = clickedBtn.getAttribute("value");
            handler(clickedBtnValue); // Pass the clicked button's value to the handler
            this._removeActiveClass();
            this._setActiveClass(clickedBtn);
          })
        );
      }
    });
  }

  addRecRecipeHandler(handler) {
    document.addEventListener("DOMContentLoaded", () => {
      if (
        window.location.pathname === "/index.html" ||
        window.location.pathname === "/"
      ) {
        handler();
      }
    });
  }
}
export default new RecommendedRecipeView();
