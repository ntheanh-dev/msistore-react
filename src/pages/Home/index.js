import { Fragment } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Carousels from "~/Layouts/conponents/Carousels";
import Body from "~/Layouts/conponents/Body";
function Home() {

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Fragment>
            <Carousels />
            <Body />
        </Fragment>
    );
}

export default Home;