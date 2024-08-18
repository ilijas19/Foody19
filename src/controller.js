import headerFooterView from "./views/headerFooterView.js";
import recRecipeView from "./views/recRecipeView.js";
import menuView from "./views/menuView.js";
import paginationView from "./views/paginationView.js";
import searchView from "./views/searchView.js";
import popupView from "./views/popupView.js";
import bookmarkView from "./views/bookmarkView.js";
import * as model from "./model.js";

let currentRecRecipeQuery = "breakfast"; // Default query

// HEADER AND FOOTER FUNCTIONALITY
const headerFooterControl = async function () {
  await headerFooterView.renderHeaderFooter();
  headerFooterView.setActivePage();

  bookmarkView.addBookmarkBtnHandler(openBookmarkControl);
};

//LOADING RECOMMENDED RECIPES AND REC RECIPE FUNCTIONALITY
const recRecipeControl = async function (query = currentRecRecipeQuery) {
  try {
    recRecipeView.renderSpinner();

    // Update the current query
    currentRecRecipeQuery = query;

    // Load new recipes based on the current query
    await model.loadMealTypeRecipe(currentRecRecipeQuery);

    // Render the new recipes
    recRecipeView.render(model.state.recipes);

    //ADDING EVENT LISTENERS ON EACH LOADED RECIPE(SEE RECIPE BTN) TO CALL OPEN RECIPE VIEW CONTROL
    popupView.addButtonListeners(openPopupControl);
  } catch (error) {
    console.error(error);
  }
};

// ADDING MENU FUNCTIONALITY
const menuControl = async function () {
  try {
    //ADDING FUNCTIONALITY FOR MENU AND FILTER TOGGLING
    menuView.toggleMenu();
    menuView.toggleFilter();

    //DEFAULT RECIPES LOADING
    menuView.renderSpinner();
    await model.loadMealTypeRecipe("breakfast", 45);
    menuView.render(model.state);

    //LOADING DIFFERENT RECIPES BASED ON WHITCH MEAL TYPE BUTTON IS LOADED
    /**
     * TARGET - meal type dropdown menu
     * addMenuTypeListeners() - adds event listener on each targeted button to call handler function depending whithc button is clicked then calling async function with that query and rendering recipes depending on whitch button is clicked
     */
    menuView.addMenuMealTypelisteners(async function (query) {
      menuView.renderSpinner();
      await model.loadMealTypeRecipe(query, 45);
      menuView.render(model.state);

      //ADDING EVENT LISTENERS ON EACH LOADED RECIPE(SEE RECIPE BTN) TO CALL OPEN RECIPE VIEW CONTROL
      popupView.addButtonListeners(openPopupControl);
    });

    //LOADING DIFFERENT RECIPES BASED ON DISH
    menuView.addMenuDishListeners(async function (query) {
      menuView.renderSpinner();
      await model.loadDishRecipe(query, 45);
      menuView.render(model.state);

      //ADDING EVENT LISTENERS ON EACH LOADED RECIPE(SEE RECIPE BTN) TO CALL OPEN RECIPE VIEW CONTROL
      popupView.addButtonListeners(openPopupControl);
    });

    //LOADING DIFFERENT RECIPES BASED ON HEALTH PREFERENCE
    menuView.addMenuHealthListeners(async function (query) {
      menuView.renderSpinner();
      await model.loadHealthPreferenceRecipe(query, 45);
      menuView.render(model.state);

      //ADDING EVENT LISTENERS ON EACH LOADED RECIPE(SEE RECIPE BTN) TO CALL OPEN RECIPE VIEW CONTROL
      popupView.addButtonListeners(openPopupControl);
    });

    //LOADING DIFFERENT RECIPES BASED ON CUISINE
    menuView.addMenuCuisineListeners(async function (query) {
      menuView.renderSpinner();
      await model.loadCuisinePreferenceRecipe(query, 45);
      menuView.render(model.state);

      //ADDING EVENT LISTENERS ON EACH LOADED RECIPE(SEE RECIPE BTN) TO CALL OPEN RECIPE VIEW CONTROL
      popupView.addButtonListeners(openPopupControl);
    });

    //ADDING EVENT LISTENERS ON EACH LOADED RECIPE(SEE RECIPE BTN) TO CALL OPEN RECIPE VIEW CONTROL
    popupView.addButtonListeners(openPopupControl);
  } catch (error) {
    console.error(error);
  }
};

//PAGINATION FUNCIONALITY
const paginationControl = function (query) {
  model.loadNewPage(query);
  menuView.renderSpinner();
  paginationView.render(model.state.currentRecipe);

  //ADDING EVENT LISTENERS ON EACH LOADED RECIPE(SEE RECIPE BTN) TO CALL OPEN RECIPE VIEW CONTROL
  popupView.addButtonListeners(openPopupControl);
};

const searchControl = async function () {
  try {
    searchView.addSearchHandler(async function (query) {
      await model.loadByNameRecipe(query); // Make sure to wait for the data to load
      menuView.render(model.state);
      //ADDING EVENT LISTENERS ON EACH LOADED RECIPE(SEE RECIPE BTN) TO CALL OPEN RECIPE VIEW CONTROL
      popupView.addButtonListeners(openPopupControl);
    });
  } catch (error) {
    console.error("Error loading recipes:", error);
    return;
  }
};

//CALLED FROM REC RECIPE CONTROL
const openPopupControl = function (uri) {
  model.setCurrentRecipe(uri);
  popupView.render(model.state.currentRecipe);
  popupView.addPopupButtonListeners(model.addBookmark);
};

//CALLED INSIDE HEADER FOOTER CONTROL AFTER LOADING HEADER
const openBookmarkControl = function () {
  model.loadBookmarksFromLocalStorage();
  bookmarkView.renderBookmarks(model.state.bookmarks);
  bookmarkView.addRemoveBtnListeners(function (uri) {
    model.removeBookmark(uri);
    bookmarkView.renderBookmarks(model.state.bookmarks); // Re-render after removing
  });
  bookmarkView.addSeeRecipeBtnListeners(openPopupControl); // Assuming openPopupControl is the function to open the recipe view
};
// INITALIZATION
const init = function () {
  // LOADING HEADER AND FOOTER
  headerFooterView.addHeaderFooterhandler(headerFooterControl);

  // LOAD THE RECOMENDED RECIPES ON FIRST PAGE / HAPPENS ONLY ON INDEX.HTML
  recRecipeView.addRecRecipeHandler(recRecipeControl);

  // ADDING EVENT LISTENERS FOR RECOMMENDED MENU ITEMS (HAPPENS ONLY ON INDEX.HTML)
  recRecipeView.addMenuListeners(recRecipeControl);

  // ADDING MENU FUNCTIONALITY / HAPPENS ONLY ON RECIPES.HTML
  menuView.addMenuHandler(menuControl);

  //RECIPES.HTML
  paginationView.setPaginationListeners(paginationControl);

  //HAPPENS ON BOTH PAGES
  searchControl();
};

init();
