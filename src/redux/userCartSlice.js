import { createSlice, current } from "@reduxjs/toolkit";
import { updateCartData } from "~/components/firebase/config";
import cookie from "react-cookies";
// import { auth, db } from "~/components/firebase/config";
const INIT_CART = {
    cartItems: [],
    cartTotalAmount: 0,
    cartTotalQuantity: 0,
}
export const userCartSlice = createSlice({
    name: "usercart",
    initialState: cookie.load('cart') || INIT_CART,
    reducers: {
        setUserCart: (state, action) => {
            state.cartItems = action.payload.cartItems
            state.cartTotalAmount = action.payload.cartTotalAmount
            state.cartTotalQuantity = action.payload.cartTotalQuantity
            cookie.save('cart', current(state))
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
            cookie.save('cart', current(state))

        },
        removeCart: (state, action) => {
            const newCart = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            )
            state.cartItems = newCart

            cookie.save('cart', current(state))

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
            cookie.save('cart', current(state))

        },
        increaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            state.cartItems[itemIndex].cartQuantity += 1;
            cookie.save('cart', current(state))

        },
        clearCart: (state) => {
            Object.assign(state, INIT_CART)
            cookie.remove('cart')
        },
        getTotal: (state) => {
            const { total, quanti } = state.cartItems.reduce(
                (acc, curr) => {
                    const { new_price, cartQuantity } = curr
                    const toltalPrice = Number(new_price) * cartQuantity
                    acc.total += toltalPrice
                    acc.quanti += cartQuantity
                    return acc
                }, { total: 0, quanti: 0 })
            state.cartTotalAmount = total
            state.cartTotalQuantity = quanti

            cookie.save('cart', current(state))
        }
    }
})

const getTotalProducts = (cart) => {
    const { total, quanti } = cart.cartItems.reduce(
        (acc, curr) => {
            const { new_price, cartQuantity } = curr
            const toltalPrice = Number(new_price) * cartQuantity
            acc.total += toltalPrice
            acc.quanti += cartQuantity
            return acc
        }, { total: 0, quanti: 0 })
    cart.cartTotalAmount = total
    cart.cartTotalQuantity = quanti
    return cart
}

export const orderItemDjango = (items) => {
    const result = items.map(ele => {
        return {
            id: ele.id,
            quantity: ele.cartQuantity
        }
    })
    return result
}

export const { setUserCart, getTotal, addToCart, removeCart, increaseCart, clearCart, decreaseCart } = userCartSlice.actions
export default userCartSlice.reducer
