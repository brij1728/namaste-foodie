export const domainImageURL =
  'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/';

// export const swiggyAPIURL =
  'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
export const swiggyAPIURL =
  '/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

export const SWIGGY_API_URL = process.env.REACT_APP_SWIGGY_API_URL;
export const SWIGGY_API_KEY = process.env.REACT_APP_SWIGGY_MENU_API_URL;
  
export const proxyAPIURL ='/api?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

export const proxyURL = 'https://corsproxy.io/?';

// export const MENUAPIURL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=`;
export const MENUAPIURL = `/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=`;
