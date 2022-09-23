import { Fragment } from "react";

import Carousels from "~/Layouts/conponents/Carousels";
import Body from "~/Layouts/conponents/Body";
function Home() {
    return (
        <Fragment>
            <Carousels />
            <Body />
        </Fragment>
    );
}

export default Home;