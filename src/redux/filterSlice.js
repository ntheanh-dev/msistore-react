import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        category: '',
        price: '',
        color: '',
    },
    reducers: {
        setFilters: (state, action) => {
            state.category = action.payload.category
            state.price = action.payload.price
            state.color = action.payload.color
        }
    }
})

export const { setFilters } = filterSlice.actions
export default filterSlice.reducer