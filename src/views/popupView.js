class PopupView {
  _parentEl;

  render(recipe) {
    this._clear();
    this._parentEl.innerHTML = this._generatePopupMarkup(recipe);
    // this._addPopupButtonListeners();
  }

  _generatePopupMarkup(recipe) {
    return `
    <section class="popup-recipe">
    <div class="popup-img-div">
      <img class="popup-img" src="${recipe.image}" alt="" />
    </div>
    <article class="popup-info">
      <menu class="heading-div">
        <div class="popup-heading-left-side">
          <h2 class="popup-heading">${recipe.label}</h2>
          <p class="popup-creator">by ${recipe.source}</p>
            <button data-id='${
              recipe.uri
            }' class="save-recipe-btn">SAVE RECIPE</button>

          <a class="recipe-web-link" href="${
            recipe.url
          }" target="_blank" rel="noopener noreferrer">See full recipe</a>
        </div>
       
       
          <button class="close-recipe-btn">CLOSE</button>
      
      </menu>
  
      <ul class="recipe-stats">
        <li class="recipe-stat">
          <p class="stat-num">${recipe.totalTime}</p>
          <p class="stat">Minutes</p>
        </li>
        <li class="recipe-stat">
          <p class="stat-num">${recipe.ingredients.length}</p>
          <p class="stat">ingredients</p>
        </li>
        <li class="recipe-stat">
          <p class="stat-num">${recipe.calories.toFixed(0)}</p>
          <p class="stat">Calories</p>
        </li>
      </ul>
  
      <ul class="recipe-tags">
        <li class="tag">${recipe.healthLabels[0]}</li>
        <li class="tag">${recipe.healthLabels[1]}</li>
        <li class="tag">${recipe.healthLabels[2]}</li>
        
      </ul>
  
      <div class="ingredients-div">
        <ul class="ingredients-list">
          <h2 class="ingredients-heading">Ingredients</h2>
          ${recipe.ingredientLines
            .map((ing) => {
              return `<li class="ingredient">-${ing}</li>`;
            })
            .join("")}
  
        </ul>
      </div>
    </article>
  </section>`;
  }

  _setParentEl() {
    this._parentEl = document.querySelector(".popup-container");
  }

  addPopupButtonListeners(handler) {
    const saveRecipeBtn = this._parentEl.querySelector(".save-recipe-btn");
    const saveRecipeBtnValue = saveRecipeBtn.getAttribute("data-id");
    const closeRecipeBtn = this._parentEl.querySelector(".close-recipe-btn");

    // Ensure the event listeners are only added once
    if (!saveRecipeBtn.dataset.listener) {
      saveRecipeBtn.addEventListener("click", () => {
        saveRecipeBtn.textContent = "Saved";
        handler(saveRecipeBtnValue);
      });
      saveRecipeBtn.dataset.listener = true;
    }

    if (!closeRecipeBtn.dataset.listener) {
      closeRecipeBtn.addEventListener("click", () => {
        this._togglePopup();
      });
      closeRecipeBtn.dataset.listener = true;
    }
  }

  _togglePopup() {
    this._parentEl.classList.toggle("hidden-popup");
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  addButtonListeners(handler) {
    const buttons = document.querySelectorAll(".see-rec-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const clickedBtn = e.target.closest(".see-rec-btn");
        const clickedBtnDataAttribute = clickedBtn.getAttribute("data-uri");
        this._setParentEl();
        this._togglePopup();
        handler(clickedBtnDataAttribute);
      });
    });
  }
}

export default new PopupView();
