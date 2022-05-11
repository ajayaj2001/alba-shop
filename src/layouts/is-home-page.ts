import { HOME_PAGE, GROCERY_PAGE } from "site-settings/site-navigation";
const arr = [HOME_PAGE, GROCERY_PAGE];
export function isCategoryPage(pathname) {
  return arr.includes(`/${pathname}`);
}
