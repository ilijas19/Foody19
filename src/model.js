import { appId, appKey, batchSize } from "./config.js";
export const state = {
  recipes: [],
  currentRecipe: {},
  currentPage: 1,
  resultsPerPage: 15,
  bookmarks: [],
};
//my function for fetching
/*

export const loadMealTypeRecipe = async function (query) {
  try {
    const appId = "3db71e55";
    const appKey = "82ee412a5d098ae4454699ff70784a18";
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&mealType=${query}&app_id=${appId}&app_key=${appKey}`
    );
    const data = await response.json();
    state.recipes = data.hits;

    // console.log(data.hits[0].recipe.uri);
  } catch (error) {
    console.error(error);
  }
};
*/
//chat gpt function for fetching number of results specifyed
export const loadMealTypeRecipe = async function (query, numberOfResults = 20) {
  try {
    let allRecipes = [];
    let fetchedCount = 0;

    for (let i = 0; fetchedCount < numberOfResults; i += batchSize) {
      const from = i;
      const to =
        i + batchSize > numberOfResults ? numberOfResults : i + batchSize;
      const url = `https://api.edamam.com/api/recipes/v2?type=public&mealType=${query}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`;

      const response = await fetch(url);
      const data = await response.json();
      const recipes = data.hits;
      allRecipes = allRecipes.concat(recipes);

      fetchedCount += recipes.length;

      // If fewer than expected recipes are returned, break early
      if (recipes.length < batchSize) {
        break;
      }

      // If we've fetched more than needed, slice the array to get only the required number
      if (fetchedCount > numberOfResults) {
        allRecipes = allRecipes.slice(0, numberOfResults);
        break;
      }
    }

    // Save the fetched recipes to the state
    state.currentQuery = query;
    state.recipes = allRecipes;
  } catch (error) {
    console.error("Error fetching the recipes:", error);
  }
};

export const loadDishRecipe = async function (dish, numberOfResults = 20) {
  try {
    let allRecipes = [];
    let fetchedCount = 0;

    for (let i = 0; fetchedCount < numberOfResults; i += batchSize) {
      const from = i;
      const to =
        i + batchSize > numberOfResults ? numberOfResults : i + batchSize;
      // Construct the URL with the dish query parameter
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
        dish
      )}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`;

      const response = await fetch(url);
      const data = await response.json();
      const recipes = data.hits;
      allRecipes = allRecipes.concat(recipes);

      fetchedCount += recipes.length;

      // If fewer than expected recipes are returned, break early
      if (recipes.length < batchSize) {
        break;
      }

      // If we've fetched more than needed, slice the array to get only the required number
      if (fetchedCount > numberOfResults) {
        allRecipes = allRecipes.slice(0, numberOfResults);
        break;
      }
    }

    // Save the fetched recipes to the state
    state.currentQuery = dish;
    state.recipes = allRecipes;
  } catch (error) {
    console.error("Error fetching the recipes:", error);
  }
};

export const loadHealthPreferenceRecipe = async function (
  healthPreference,
  numberOfResults = 20
) {
  try {
    let allRecipes = [];
    let fetchedCount = 0;

    for (let i = 0; fetchedCount < numberOfResults; i += batchSize) {
      const from = i;
      const to =
        i + batchSize > numberOfResults ? numberOfResults : i + batchSize;

      // Construct the URL with the health preference parameter
      const url = `https://api.edamam.com/api/recipes/v2?type=public&health=${encodeURIComponent(
        healthPreference
      )}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`;

      const response = await fetch(url);
      const data = await response.json();
      const recipes = data.hits;
      allRecipes = allRecipes.concat(recipes);

      fetchedCount += recipes.length;

      // If fewer than expected recipes are returned, break early
      if (recipes.length < batchSize) {
        break;
      }

      // If we've fetched more than needed, slice the array to get only the required number
      if (fetchedCount > numberOfResults) {
        allRecipes = allRecipes.slice(0, numberOfResults);
        break;
      }
    }

    // Save the fetched recipes to the state
    state.currentQuery = healthPreference;
    state.recipes = allRecipes;
    console.log(allRecipes);
  } catch (error) {
    console.error("Error fetching the recipes:", error);
  }
};

export const loadCuisinePreferenceRecipe = async function (
  cuisinePreference,
  numberOfResults = 20
) {
  try {
    let allRecipes = [];
    let fetchedCount = 0;

    for (let i = 0; fetchedCount < numberOfResults; i += batchSize) {
      const from = i;
      const to =
        i + batchSize > numberOfResults ? numberOfResults : i + batchSize;

      // Construct the URL with the cuisine preference parameter
      const url = `https://api.edamam.com/api/recipes/v2?type=public&cuisineType=${encodeURIComponent(
        cuisinePreference
      )}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`;

      const response = await fetch(url);
      const data = await response.json();
      const recipes = data.hits;
      allRecipes = allRecipes.concat(recipes);

      fetchedCount += recipes.length;

      // If fewer than expected recipes are returned, break early
      if (recipes.length < batchSize) {
        break;
      }

      // If we've fetched more than needed, slice the array to get only the required number
      if (fetchedCount > numberOfResults) {
        allRecipes = allRecipes.slice(0, numberOfResults);
        break;
      }
    }

    // Save the fetched recipes to the state
    state.currentQuery = cuisinePreference;
    state.recipes = allRecipes;
    console.log(allRecipes);
  } catch (error) {
    console.error("Error fetching the recipes:", error);
  }
};

export const loadNewPage = function (query) {
  if (query === "next" && state.currentPage < 3) {
    state.currentPage++;
  }

  if (query === "prev" && state.currentPage > 1) {
    state.currentPage--;
  }

  const start = (state.currentPage - 1) * state.resultsPerPage;
  const end = state.currentPage * state.resultsPerPage;

  state.currentRecipe = state.recipes.slice(start, end);
};

export const loadByNameRecipe = async function (query) {
  try {
    const totalRecipesNeeded = 45; // Total number of recipes needed

    let allRecipes = [];
    let fetchedCount = 0;

    while (fetchedCount < totalRecipesNeeded) {
      const from = fetchedCount;
      const to = Math.min(fetchedCount + batchSize, totalRecipesNeeded);
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.hits.length === 0) {
          throw new Error("err");
        }
        const recipes = data.hits;

        allRecipes = allRecipes.concat(recipes);
        fetchedCount += recipes.length;

        // Break if fewer recipes are returned than requested
        if (recipes.length < batchSize) {
          break;
        }
      } catch (error) {
        console.error("Error fetching the recipes:", error);
        throw error;
      }
    }

    const limitedRecipes = allRecipes.slice(0, totalRecipesNeeded);
    state.recipes = limitedRecipes;
    state.currentQuery = query;
  } catch (error) {
    throw error;
  }
};

export const addBookmark = function (uri) {
  // Load existing bookmarks from local storage
  const storedBookmarks = localStorage.getItem("bookmarks");
  if (storedBookmarks) {
    state.bookmarks = JSON.parse(storedBookmarks);
  }

  // Check if the recipe already exists in the bookmarks
  const isBookmarked = state.bookmarks.some((recipe) => recipe.uri === uri);

  // If the recipe is not already bookmarked, add it to the bookmarks
  if (!isBookmarked) {
    const recipe = state.recipes.find(
      (recipe) => recipe.recipe.uri === uri
    ).recipe;
    recipe.isBookmarked = 1;
    state.bookmarks.push(recipe);
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
  } else {
    alert("Recipe is already bookmarked");
  }
};

export const removeBookmark = function (uri) {
  // Remove the bookmark from the state
  state.bookmarks = state.bookmarks.filter((recipe) => recipe.uri !== uri);

  // Find the corresponding recipe in the state.recipes array and update isBookmarked
  const recipeInState = state.recipes.find(
    (recipe) => recipe.recipe.uri === uri
  );
  if (recipeInState) {
    recipeInState.recipe.isBookmarked = 0;
  }

  // Update the bookmarks in local storage
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const loadBookmarksFromLocalStorage = function () {
  const storedBookmarks = localStorage.getItem("bookmarks");
  if (storedBookmarks) {
    state.bookmarks = JSON.parse(storedBookmarks);
  }
};
//
///
////
/////
//////
///////
////////
export const setCurrentRecipe = function (uri) {
  const recipe = state.recipes.find(
    (recipe) => recipe.recipe.uri === uri
  ).recipe;
  state.currentRecipe = recipe;
};
