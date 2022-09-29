import { createSlice } from "@reduxjs/toolkit";

export const shoppingSlice = createSlice({
    name: 'shoppingCart',
    initialState: { value: null },
    reducers: {
        set: (state, action) => {
            state.value = action.payload
        }
    }
})


export const { set } = shoppingSlice.actions
export default shoppingSlice.reducer