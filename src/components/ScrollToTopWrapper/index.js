import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTopWrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
};
export default ScrollToTopWrapper;
