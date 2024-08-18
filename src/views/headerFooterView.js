class HeaderFooterView {
  _headerEl = document.getElementById("header");
  _footerEl = document.getElementById("footer");

  setActivePage() {
    if (
      window.location.pathname === "/index.html" ||
      window.location.pathname === "/"
    ) {
      document.querySelector(".header-menu-home").classList.add("selected");
    } else {
      document.querySelector(".header-menu-recipes").classList.add("selected");
    }
  }

  async renderHeaderFooter() {
    try {
      this._clear();
      await this.loadHeader();
      await this.loadFooter();
    } catch (error) {
      console.error(error);
    }
  }

  async loadHeader() {
    try {
      const headerRes = await fetch("../../header.html");
      const headerHtml = await headerRes.text();
      this._headerEl.innerHTML = headerHtml;
    } catch (error) {
      throw error;
    }
  }

  async loadFooter() {
    try {
      const footerRes = await fetch("../../footer.html");
      const footerHtml = await footerRes.text();
      this._footerEl.innerHTML = footerHtml;
    } catch (error) {
      throw error;
    }
  }

  addHeaderFooterhandler(handler) {
    window.addEventListener("DOMContentLoaded", async function () {
      await handler();
      window.scrollTo(0, 0); // Reset scroll position to the top
    });
  }

  _clear() {
    this._headerEl.innerHTML = "";
    this._footerEl.innerHTML = "";
  }
}

export default new HeaderFooterView();
