import Features from "./Features";
import FooterInfors from "./Footer";
import { Container } from "react-bootstrap";

import FacebookChat from "~/components/Facebook/Message";
function Footer() {
    return (
        <Container fluid>
            <Features />
            {/* <FacebookChat pageID={"413476897468930"} addId={"816823852900349"} /> */}
            <FooterInfors />
        </Container>
    );
}

export default Footer;