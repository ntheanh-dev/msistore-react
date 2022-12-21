import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
const initialUser = {
    value: JSON.parse(localStorage.getItem("userData")) || {
        cart: {
            cartItems: [],
            cartTotalAmount: 0,
            cartTotalQuantity: 0,
        }
    },
    status: 'idle',
}
export const userSlice = createSlice({
    name: "user",
    initialState: initialUser,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        addToCart: (state, action) => {
            const itemIndex = state.value.cart.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            if (itemIndex < 0) {
                state.value.cart.cartItems.push({ ...action.payload, cartQuantity: 1 })
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
                state.value.cart.cartItems[itemIndex].cartQuantity += 1;
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
            const newCart = state.value.cart.cartItems.filter(
                (item) => item.id !== action.payload.id
            )
            state.value.cart.cartItems = newCart
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
            const itemIndex = state.value.cart.cartItems.findIndex(
                item => item.id === action.payload.id
            )
            if (state.value.cart.cartItems[itemIndex].cartQuantity > 1) {
                state.value.cart.cartItems[itemIndex].cartQuantity -= 1;
            } else if (state.value.cart.cartItems[itemIndex].cartQuantity === 1) {
                const newCart = state.value.cart.cartItems.filter(
                    (item) => item.id !== action.payload.id
                )
                state.value.cart.cartItems = newCart
            }
        },
        increaseCart: (state, action) => {
            const itemIndex = state.value.cart.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            state.value.cart.cartItems[itemIndex].cartQuantity += 1;
        },
        getTotal: (state, action) => {
            const { total, quanti } = state.value.cart.cartItems.reduce(
                (acc, curr) => {
                    const { newPrice, cartQuantity } = curr
                    const toltalPrice = newPrice * cartQuantity
                    acc.total += toltalPrice
                    acc.quanti += cartQuantity
                    return acc
                }, { total: 0, quanti: 0 })
            state.value.cart.cartTotalAmount = total
            state.value.cart.cartTotalQuantity = quanti
        },
        logout: (state, action) => {
            localStorage.removeItem("userData");
            state.value = {
                cart: {
                    cartItems: [],
                    cartTotalAmount: 0,
                    cartTotalQuantity: 0,
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userFetch.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(userFetch.fulfilled, (state, action) => {
                state.status = 'done'
                if (action.payload[0]) {
                    state.value = action.payload[0]
                    localStorage.setItem("userData", JSON.stringify(action.payload[0]))
                }
            })
            .addCase(userPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(userPost.fulfilled, (state, action) => {
                state.status = 'doneeeee'
                // state.value = action.payload
                // localStorage.setItem("userData", JSON.stringify(action.payload))
            })

            .addCase(userPut.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(userPut.fulfilled, (state, action) => {
                state.status = 'done'
                state.value = action.payload
            })
    }
})
export const userFetch = createAsyncThunk("user,userFetch",
    async (userData) => {
        const { email, password } = userData
        const responceJSON = await fetch(`https://json-server-sand.vercel.app/api/users?email=${email}&password=${password}`)
        const responce = await responceJSON.json()
        return responce
    }
)
export const userByEmailFetch = createAsyncThunk("userByGmail,userByEmailFetch",
    async (email) => {
        const responceJSON = await fetch(`https://json-server-sand.vercel.app/api/users?email=${email}`)
        const responce = await responceJSON.json()
        return responce
    }
)
export const userPost = createAsyncThunk("user,userPost",
    async (user) => {
        fetch('https://json-server-sand.vercel.app/api/users/', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-type': 'application/json; charset=UTF-8', }
        })
        return user
    }
)
export const userPut = createAsyncThunk("user,userPut",
    async (user) => {
        fetch(`https://json-server-sand.vercel.app/api/users/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
        localStorage.setItem("userData", JSON.stringify(user))
        return user
    }
)
export const { addToCart, removeCart, increaseCart, decreaseCart, getTotal, setCart, logout, setUser } = userSlice.actions
export default userSlice.reducer;
