import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"

export const shoppingSlice = createSlice({
    name: 'shoppingCart',
    initialState: {
        cartItems: [],
        cartTotalAmount: 0,
        cartTotalQuantity: 0,
    },
    reducers: {
        setCart: (state, action) => {
            state.cartItems = action.payload
        },
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            if (itemIndex < 0) {
                state.cartItems.push({ ...action.payload, cartQuantity: 1 })
                toast.success(`Added ${action.payload.name} to cart`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`Increased ${action.payload.name} quantity`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
                );
            }
        },
        removeCart: (state, action) => {
            const newCart = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            )
            state.cartItems = newCart
            toast.error(`Remove ${action.payload.name} from cart`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id
            )

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.warn(`Decreased ${action.payload.name} quantity`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const newCart = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                )
                state.cartItems = newCart
                toast.error(`Remove ${action.payload.name} from cart`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        },
        increaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            state.cartItems[itemIndex].cartQuantity += 1;

            toast.info(`Increased ${action.payload.name} quantity`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
            );
        },
        clearCar: (state, action) => {
            state.cartItems = []
            toast.error(`Cleared shopping cart`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        },
        getTotal: (state, action) => {

            const { total, quanti } = state.cartItems.reduce(
                (acc, curr) => {
                    const { newPrice, cartQuantity } = curr
                    const toltalPrice = newPrice * cartQuantity
                    acc.total += toltalPrice
                    acc.quanti += 1
                    return acc
                }, { total: 0, quanti: 0 })

            state.cartTotalAmount = total
            state.cartTotalQuantity = quanti
        }
    }
})


export const { addToCart, removeCart, increaseCart, decreaseCart, clearCar, getTotal, setCart } = shoppingSlice.actions
export default shoppingSlice.reducer
