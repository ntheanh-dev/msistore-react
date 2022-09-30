import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: JSON.parse(localStorage.getItem("userData")) || null,
        status: 'idle'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userFetch.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(userFetch.fulfilled, (state, action) => {
                state.status = 'done'
                state.value = action.payload[0]
            })
            .addCase(userPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(userPost.fulfilled, (state, action) => {
                state.status = 'doneeeee'
                state.value = action.payload
                console.log(action.payload)
            })
    }
})

export const userFetch = createAsyncThunk("user,userFetch",
    async (userData) => {
        const { email, password } = userData
        const responceJSON = await fetch(`https://msi-data.herokuapp.com/api/users?email=${email}&password=${password}`)
        const responce = await responceJSON.json()
        // localStorage.setItem("userData", JSON.stringify(responce[0]))

        return responce
    }
)

export const userByEmailFetch = createAsyncThunk("userByGmail,userByEmailFetch",
    async (email) => {
        const responceJSON = await fetch(`https://msi-data.herokuapp.com/api/users?email=${email}`)
        const responce = await responceJSON.json()
        return responce
    }
)

export const userPost = createAsyncThunk("user,userPost",
    async (user) => {
        fetch('https://msi-data.herokuapp.com/api/users/', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        // localStorage.setItem("userData", JSON.stringify(user))
        return user
    }
)
export default userSlice.reducer;