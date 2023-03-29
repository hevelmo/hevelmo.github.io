export const ROUTERS = {
    CSS_PATH: 'assets/css/',
    JS_PATH: 'assets/js/',
    LIB_PATH: 'assets/lib',
    IMG_PATH: 'assets/img',
    FONTS_PATH: 'assets/fonts'
};
// En controller.js
export function handleRouteChange() {
  const { pathname } = window.location;

  switch (pathname) {
    case ROUTES.ABOUT:
      renderAbout();
      break;
    case ROUTES.CONTACT:
      renderContact();
      break;
    default:
      renderHome();
  }
}
