import classNames from "classnames/bind";
import style from "./ChildDashboardComponents.mobule.scss"
import { useSelector } from "react-redux";
import { AiOutlineInbox } from "react-icons/ai";


import Product from "~/components/Product";

const cx = classNames.bind(style)
function MyOrders() {
    const cart = useSelector(state => state.user.value.cart)
    return (
        <>
            {cart.cartItems.length > 0 ? (
                cart.cartItems.map(product => (
                    <Product isInCart key={product.id} data={product} />
                ))
            ) : (
                <div className={cx('nodata')}>
                    <AiOutlineInbox />
                    <h1>No data</h1>
                </div>
            )}

        </>);
}

export default MyOrders;