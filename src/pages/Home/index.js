import { Fragment } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Carousels from "~/Layouts/sections/Carousels";
import Body from "~/Layouts/sections/Body";
function Home() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    useEffect(() => {
        document.title = 'MSI Store'
    }, [])
    return (
        <>
            <Carousels />
            <Body />
        </>
    );
}

export default Home;