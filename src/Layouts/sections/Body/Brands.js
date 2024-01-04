import classNames from "classnames/bind";

import style from "./Body.module.scss";
import msi from '~/assets/images/brands/msi.png';
import adata from '~/assets/images/brands/adata.png';
import gigabyte from '~/assets/images/brands/gigabyte.png';
import hp from '~/assets/images/brands/hp.png';
import razez from '~/assets/images/brands/razez.png';
import roccat from '~/assets/images/brands/roccat.png';

const cx = classNames.bind(style)
function Brands() {

    const bands = [
        {
            name: msi,
            href: "https://www.vn.msi.com",
        },
        {
            name: roccat,
            href: "https://ca.roccat.com/",
        },
        {
            name: razez,
            href: "https://www.razer.com/",
        },
        {
            name: gigabyte,
            href: "https://www.gigabyte.com/vn",
        },
        {
            name: hp,
            href: "https://www.hp.com/us-en/shop/cat/laptops",
        },
        {
            name: adata,
            href: "https://www.adata.com/vn/",
        }
    ]

    return (
        <div className={cx('wrapper-brand')}>
            {
                bands.map((brand, index) =>
                (
                    <a href={brand.href} className={cx('brand-link')} key={index}>
                        <img src={brand.name} alt="name" />
                    </a>
                )
                )
            }
        </div>
    );
}

export default Brands;