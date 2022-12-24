import { createSlice, current } from "@reduxjs/toolkit";
import { updateCartData } from "~/components/firebase/config";
// import { auth, db } from "~/components/firebase/config";
export const userCartSlice = createSlice({
    name: "usercart",
    initialState: JSON.parse(localStorage.getItem("localCart")) || {
        cartItems: [],
        cartTotalAmount: 0,
        cartTotalQuantity: 0,
    },
    reducers: {
        setUserCart: (state, action) => {
            state.cartItems = action.payload.cartItems
            state.cartTotalAmount = action.payload.cartTotalAmount
            state.cartTotalQuantity = action.payload.cartTotalQuantity

            const currentCart = current(state)
            const data = getTotalProducts(currentCart)
            localStorage.setItem("localCart", JSON.stringify(data));
        },
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            if (itemIndex < 0) {
                state.cartItems.push({ cartQuantity: 1, ...action.payload })
            } else {
                const { cartQuantity } = action.payload
                state.cartItems[itemIndex].cartQuantity += cartQuantity ? cartQuantity : 1;
            }

            const currentCart = current(state)
            const data = getTotalProducts(currentCart)
            localStorage.setItem("localCart", JSON.stringify(data));
            updateCartData(data);
        },
        removeCart: (state, action) => {
            const newCart = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            )
            state.cartItems = newCart

            const currentCart = current(state)
            const data = getTotalProducts(currentCart)
            localStorage.setItem("localCart", JSON.stringify(data));
            updateCartData(data);
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id
            )
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const newCart = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                )
                state.cartItems = newCart
            }

            const currentCart = current(state)
            const data = getTotalProducts(currentCart)
            localStorage.setItem("localCart", JSON.stringify(data));
            updateCartData(data);
        },
        increaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            state.cartItems[itemIndex].cartQuantity += 1;
            const currentCart = current(state)
            const data = getTotalProducts(currentCart)
            localStorage.setItem("localCart", JSON.stringify(data));
            updateCartData(data);

        },
        clearCart: (state) => {
            const initialCart = {
                cartItems: [],
                cartTotalAmount: 0,
                cartTotalQuantity: 0,
            }
            state.cartItems = initialCart.cartItems
            state.cartTotalAmount = initialCart.cartTotalAmount
            state.cartTotalQuantity = initialCart.cartTotalQuantity

            localStorage.setItem("localCart", JSON.stringify(initialCart));
            updateCartData(initialCart);
        },
        setLogoutCart: (state) => {
            const initialCart = {
                cartItems: [],
                cartTotalAmount: 0,
                cartTotalQuantity: 0,
            }
            state.cartItems = initialCart.cartItems
            state.cartTotalAmount = initialCart.cartTotalAmount
            state.cartTotalQuantity = initialCart.cartTotalQuantity

            localStorage.removeItem("localCart");
        },
        getTotal: (state) => {
            const { total, quanti } = state.cartItems.reduce(
                (acc, curr) => {
                    const { newPrice, cartQuantity } = curr
                    const toltalPrice = newPrice * cartQuantity
                    acc.total += toltalPrice
                    acc.quanti += cartQuantity
                    return acc
                }, { total: 0, quanti: 0 })
            state.cartTotalAmount = total
            state.cartTotalQuantity = quanti
        }
    }
})

const getTotalProducts = (cart) => {
    const { total, quanti } = cart.cartItems.reduce(
        (acc, curr) => {
            const { newPrice, cartQuantity } = curr
            const toltalPrice = newPrice * cartQuantity
            acc.total += toltalPrice
            acc.quanti += cartQuantity
            return acc
        }, { total: 0, quanti: 0 })
    cart.cartTotalAmount = total
    cart.cartTotalQuantity = quanti
    return cart
}

export const { setUserCart, getTotal, addToCart, removeCart, increaseCart, clearCart, setLogoutCart, decreaseCart } = userCartSlice.actions
export default userCartSlice.reducer
