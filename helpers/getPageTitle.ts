import {appTitle} from "@/api/constants";

const getPageTitle = (title?: string) => {
  if (!title) {
    return appTitle;
  }

  return `${title} | ${appTitle}`;
};

export default getPageTitle;
