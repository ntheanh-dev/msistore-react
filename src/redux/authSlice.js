import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import cookie from "react-cookies";
import API, { endpoints, authAPI } from "~/configs/API";

const INIT_USER_STATE = {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    avatar: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: 'idle',
        user: cookie.load('current-user') || INIT_USER_STATE
    },

    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload
            cookie.save('current-user', current(state).user)
        },
        setLogoutUserInfo: (state) => {
            cookie.remove('access-token')
            cookie.remove('current-user')
            cookie.remove('address')
            state.user = INIT_USER_STATE
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload
                    cookie.save('current-user', current(state).user)
                }
                state.status = 'idle'
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'idle'
            })


            .addCase(login.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload
                    cookie.save('current-user', current(state).user)
                }
                state.status = 'idle'
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'idle'
            })



            .addCase(update.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(update.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload
                }

                state.status = 'idle'
            })
            .addCase(update.rejected, (state, action) => {
                state.status = 'idle'
            })

            .addCase(refreshToken.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.status = 'idle'
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.status = 'idle'
            })
    }
})

export const register = createAsyncThunk("user,registerUser",
    async (data, { rejectWithValue }) => {
        let form = new FormData()
        form.append("first_name", data.first_name)
        form.append("last_name", data.last_name)
        form.append("username", data.username)
        form.append("password", data.password)
        form.append("email", data.email)
        form.append("avatar", data.avatar)
        try {
            let res = await API.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res.status === 201)
                return res.data
        } catch (e) {
            console.log(e)
            return rejectWithValue(e.response.data)
        }
        return
    }
)

export const login = createAsyncThunk('user,loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const res = await API.post(endpoints['login'], {
                "username": data.username,
                "password": data.password,
                "client_id": "noHF2gWxRmKaCiQmSAXOkB3YmFTk3AxMhZzxOxZD",
                "client_secret": "k6iQGcjaaSZIExwYQ5VJTKVb7wOvYULOvjhpBXKGYTP5mrxPZ0fI1eHRuclCCT2gE4SMfVjC1bwrCEe9emuNlOFWS9KF17PU3VDF1oFwViWB1403co2ibsU1vs20Ir8R",
                "grant_type": "password"
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            cookie.save('access-token', res.data.access_token)
            cookie.save('refresh-token', res.data.refresh_token)
            let user = await authAPI().get(endpoints['current-user'])
            cookie.save('current-user', user.data)

            return user.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const changePassword = createAsyncThunk('user,loginUser',
    async (data, { rejectWithValue }) => {
        try {

            const res = await authAPI().post(endpoints['change-password'], data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            return res.data
        } catch (err) {
            console.log(err)
            return rejectWithValue({ data: err.response.data, status: err.response.status })
        }
    }
)


export const update = createAsyncThunk('user,updateUser',
    async (data, { rejectWithValue }) => {
        try {
            let user = await authAPI().put(endpoints['current-user'], data)
            cookie.save('current-user', user.data)
            return user.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const refreshToken = createAsyncThunk('tokent, refreshToken',
    async ({ rejectWithValue }) => {
        try {
            const res = await API.post(endpoints['refresh-tokent'], {
                "client_id": "noHF2gWxRmKaCiQmSAXOkB3YmFTk3AxMhZzxOxZD",
                "client_secret": "k6iQGcjaaSZIExwYQ5VJTKVb7wOvYULOvjhpBXKGYTP5mrxPZ0fI1eHRuclCCT2gE4SMfVjC1bwrCEe9emuNlOFWS9KF17PU3VDF1oFwViWB1403co2ibsU1vs20Ir8R",
                "grant_type": "refresh_token",
                "refresh_token": cookie.load('refresh-token')
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            cookie.save('access-token', res.data.access_token)
            cookie.save('refresh-token', res.data.refresh_token)

            return
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const { setUserInfo, setLogoutUserInfo, } = authSlice.actions
export default authSlice.reducer
