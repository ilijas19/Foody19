class SearchView {
  _searchInput = document.querySelector(".search");
  _searchBtn = document.querySelector(".search-btn");

  addSearchHandler(handler) {
    window.addEventListener("DOMContentLoaded", () => {
      this._searchBtn.addEventListener("click", () => {
        const query = this._searchInput.value;
        if (query.trim() === "") return; // Prevent empty searches

        // Navigate to recipes.html with the search query as a URL parameter
        window.location.href = `recipes.html?search=${encodeURIComponent(
          query
        )}`;
      });

      const currentPage = window.location.pathname;
      if (currentPage.includes("recipes.html")) {
        // Delay the handler until the DOM is fully loaded and ready
        window.addEventListener("load", () => {
          const urlParams = new URLSearchParams(window.location.search);
          const query = urlParams.get("search");

          if (query) {
            handler(query);
          }
        });
      }
    });
  }
}

export default new SearchView();
