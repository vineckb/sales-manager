class Route {
  path;
  view;
  
  constructor({ path, view }) {
    this.path = path;
    this.view = view;
  }

  isActiveRoute(hashedPath)  {
    return hashedPath.replace('#', '') === this.path; 
  }
}