import Product from "~/components/Product";
import { Container } from "react-bootstrap";

import img from "~/assets/images/laptops/lap1-1.png"
function ProductDetail() {
    return (
        <Container>
            <Product
                isDetail
                name={"MSI MPG Trident 3"}
                desc={'MSI MPG Trident 3 10SC-005AU Intel i7 10700F, 2060 SUPER, 16GB RAM, 512GB SSD, 2TB HDD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty Gaming Desktop'}
                img={img}
                price={500}
                quanti={1}
            />
        </Container>
    );
}

export default ProductDetail;