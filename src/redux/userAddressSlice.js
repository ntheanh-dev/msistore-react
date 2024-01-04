import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import cookie from "react-cookies";
import { authAPI, endpoints } from "~/configs/API";

export const userAddressSlice = createSlice({
    name: "userAddress",
    initialState: {
        status: 'idle',
        address: cookie.load('address') || null
    },
    reducers: {
        setUserAddress: (state, action) => {
            Object.assign(state, action)
            cookie.save('address', action)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(update.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(update.fulfilled, (state, action) => {
                if (action.payload) {
                    state.address = action.payload
                    cookie.save('address', current(state).address)
                }
                state.status = 'idle'
            })
            .addCase(update.rejected, (state, action) => {
                state.status = 'rejected'
            })

            .addCase(create.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(create.fulfilled, (state, action) => {
                if (action.payload) {
                    state.address = action.payload
                    cookie.save('address', current(state).address)
                }
                state.status = 'idle'
            })
            .addCase(create.rejected, (state, action) => {
                state.status = 'rejected'
            })

            .addCase(getUserInfo.pending, (state) => {
                state.status = 'pending'
                state.address = null
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                if (action.payload) {
                    state.address = action.payload
                    cookie.save('address', current(state).address)
                }
                state.status = 'idle'
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.status = 'rejected'
            })
    }
})

export const getUserInfo = createAsyncThunk('userInfo,getUserInfo',
    async (data, { rejectWithValue }) => {
        try {
            let user_info = await authAPI().get(endpoints['user-info'])
            return user_info.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const update = createAsyncThunk("address,updateAddress",
    async (data, { rejectWithValue }) => {
        try {
            const user = cookie.load('current-user')
            if (user) {
                let res = await authAPI().patch(endpoints['user-info-update'](user.id), data)
                cookie.save('address', res.data)
                return res.data
            } else {
                throw new Error('Not found current user')
            }
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const create = createAsyncThunk("address,createAddress",
    async (data, { rejectWithValue }) => {
        try {
            let res = await authAPI().post(endpoints['user-info'], data)
            console.log(res.data)
            cookie.save('address', res.data)
            return res.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)


export const { setUserAddress } = userAddressSlice.actions
export default userAddressSlice.reducer
