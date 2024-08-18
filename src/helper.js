//get 30 mealtype
/*
const appId = "3db71e55";
const appKey = "82ee412a5d098ae4454699ff70784a18";
const mealType = "snack"; // Filter for snack recipes
const batchSize = 20; // Number of recipes per request
const totalRecipesNeeded = 30; // Total number of recipes needed

const fetchRecipes = async () => {
  let allRecipes = [];
  let fetchedCount = 0;

  for (let i = 0; fetchedCount < totalRecipesNeeded; i += batchSize) {
    const from = i;
    const to = i + batchSize;
    const url = `https://api.edamam.com/api/recipes/v2?type=public&mealType=${mealType}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const recipes = data.hits;
      allRecipes = allRecipes.concat(recipes);

      fetchedCount += recipes.length;

      // Break if fewer than expected recipes are returned (no more available)
      if (recipes.length < batchSize) {
        break;
      }

      // If we have fetched more than needed, slice the array to get only the required number
      if (fetchedCount > totalRecipesNeeded) {
        allRecipes = allRecipes.slice(0, totalRecipesNeeded);
        break;
      }
    } catch (error) {
      console.error("Error fetching the recipes:", error);
      break;
    }
  }

  console.log(allRecipes); // This will log exactly 30 snack recipes
};

fetchRecipes();
*/

//get 30 meal name
/*
const appId = "3db71e55";
const appKey = "82ee412a5d098ae4454699ff70784a18";
const query = "chicken"; // Search query for chicken recipes
const batchSize = 20; // Number of recipes per request
const totalRecipesNeeded = 30; // Total number of recipes needed

const fetchRecipes = async () => {
  let allRecipes = [];
  let fetchedCount = 0;

  while (fetchedCount < totalRecipesNeeded) {
    const from = fetchedCount;
    const to = Math.min(fetchedCount + batchSize, totalRecipesNeeded);
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const recipes = data.hits;

      allRecipes = allRecipes.concat(recipes);
      fetchedCount += recipes.length;

      // Break if fewer recipes are returned than requested
      if (recipes.length < batchSize) {
        break;
      }
    } catch (error) {
      console.error("Error fetching the recipes:", error);
      break;
    }
  }

  // Limit the result to the required number of recipes
  const limitedRecipes = allRecipes.slice(0, totalRecipesNeeded);

  console.log(limitedRecipes); // Logs exactly 30 chicken recipes
};

fetchRecipes();
*/
