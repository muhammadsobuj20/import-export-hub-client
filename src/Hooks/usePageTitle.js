import { useEffect } from "react";
import { useLocation } from "react-router";

const usePageTitle = (title) => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title;
  }, [pathname, title]);
};

export default usePageTitle;
