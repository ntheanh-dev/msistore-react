import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: JSON.parse(localStorage.getItem("userData")) || null
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { update } = userSlice.actions
export default userSlice.reducer;