import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        category: '',
        price: '',
        color: '',
        search: '',
        id: '',
    },
    reducers: {
        setFilters: (state, action) => {
            state.category = action.payload.category
            state.price = action.payload.price
            state.color = action.payload.color
        },
        setSerach: (state, action) => {
            state.search = action.payload
        },
        setId: (state, action) => {
            state.id = action.payload
        }
    }
})

export const { setFilters, setSerach, setId } = filterSlice.actions
export default filterSlice.reducer