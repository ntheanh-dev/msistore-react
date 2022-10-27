import Features from "./Features";
import FooterInfors from "./Footer";
import { Container } from "react-bootstrap";

function Footer() {
    return (
        <Container fluid>
            <Features />
            <FooterInfors />
        </Container>
    );
}

export default Footer;