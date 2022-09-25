import ProductDetail from "~/components/ProductDetail";

import img from "~/assets/images/laptops/lap1-1.png"
function ProductView() {
    return (
        <ProductDetail
            isDetail
            name={"MSI MPG Trident 3"}
            desc={'MSI MPG Trident 3 10SC-005AU Intel i7 10700F, 2060 SUPER, 16GB RAM, 512GB SSD, 2TB HDD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty Gaming Desktop'}
            img={img}
            price={500}
            quanti={1}
        />
    );
}

export default ProductView;