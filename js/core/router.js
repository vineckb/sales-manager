class Router {
  routes;
  rootElem;

  constructor(routes) {
    this.routes = routes.map(options => new Route(options));
    this.rootElem = document.getElementById('app');

    window.addEventListener('hashchange', () => this.hasChanged());

    this.hasChanged();
  }

  hasChanged() {
    if (window.location.hash.length > 0) {
      for (let i = 0; i < this.routes.length; i++) {
        const route = this.routes[i];
        if(route.isActiveRoute(window.location.hash.substr(1))) {
          this.goToRoute(route.htmlName);
        }
      }
    } else {
      for (let i = 0; i < this.routes.length; i++) {
        const route = this.routes[i];
        if(route.default) {
          this.goToRoute(route.htmlName);
        }
      }
    }
  }

  goToRoute(htmlName) {
    const parent = this;
    const url = `views/${htmlName}`;
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        parent.rootElem.innerHTML = this.responseText;
      }
    }
    
    xhttp.open('GET', url, true);
    xhttp.send();
  }
}
