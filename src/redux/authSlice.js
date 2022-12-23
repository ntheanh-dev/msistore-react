import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";

import { auth, db } from "~/components/firebase/config";
import {
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
} from "firebase/auth";

const GoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

const FaceBookLogin = async () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
};

export const authSlice = createSlice({
    name: "auth",
    initialState: JSON.parse(localStorage.getItem("userLocal")) || {
        displayName: null,
        email: null,
        uid: null,
        photoURL: null,
        status: 'idle',
        // displayName: "Anh Nguyễn Thế",
        // email: "2151013002anh@ou.edu.vn",
        // photoURL: "/images/avata2.jpg",
        // uid: "103488712315886769273"
    },

    reducers: {
        setUserInfo: (state, action) => {
            state.displayName = action.payload.displayName
            state.email = action.payload.email
            state.uid = action.payload.uid
            state.photoURL = action.payload.photoURL
            localStorage.setItem("userLocal", JSON.stringify(current(state)))
        },
        setLogoutUserInfo: (state) => {
            state.displayName = null
            state.email = null
            state.uid = null
            state.photoURL = null
            localStorage.removeItem("userLocal");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserByEmail.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUserByEmail.fulfilled, (state, action) => {
                if (action.payload !== -1) {
                    state.displayName = action.payload.displayName
                    state.email = action.payload.email
                    state.uid = action.payload.uid
                    state.photoURL = action.payload.photoURL
                    localStorage.setItem("userLocal", JSON.stringify(current(state)))
                }
                state.status = 'idle'
            })
            .addCase(registerFirebase.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(registerFirebase.fulfilled, (state, action) => {
                if (action.payload !== -1) {
                    state.displayName = action.payload.displayName
                    state.email = action.payload.email
                    state.uid = action.payload.uid
                    state.photoURL = action.payload.photoURL
                    localStorage.setItem("userLocal", JSON.stringify(current(state)))
                }
                state.status = 'idle'
            })
            .addCase(changeUserInfo.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(changeUserInfo.fulfilled, (state, action) => {
                const data = action.payload
                for (let key in data) {
                    state[key] = data[key]
                }
                state.status = 'idle'
                localStorage.setItem("userLocal", JSON.stringify(current(state)))
            })
    }
})

export const getUserByEmail = createAsyncThunk("getUserByGmail,getUserByEmailFetch",
    async (user) => {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        // tim thay user
        if (querySnapshot.docs.length === 1) {
            let data = null
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                data = doc.data()
            });
            if (data.password === user.password) {
                return data
            }
        }
        // khong tim thay user or password sai
        return -1;
    }
)

export const registerFirebase = createAsyncThunk("registerFirebase,registerFirebase",
    async (newUser) => {
        const q = query(collection(db, "users"), where("uid", "==", newUser.uid));
        const querySnapshot = await getDocs(q);
        // tim thay use
        if (querySnapshot.docs.length === 1) return -1;
        // tien hanh ghi thong tin user vao firebase
        try {
            await setDoc(doc(db, "users", newUser.uid), {
                ...newUser
            });
            return newUser
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
)

export const changeUserInfo = createAsyncThunk("changeUserInfo,changeUserInfo",
    async (newData) => {
        const { uid, ...ortherData } = newData
        const docRef = doc(db, "users", uid);
        setDoc(docRef, {
            ...ortherData
        }, { merge: true })
            .then()
            .catch(e => {
                console.log(e)
            })
        return ortherData
    }
)

export const { setUserInfo, setLogoutUserInfo } = authSlice.actions
export { GoogleLogin, FaceBookLogin }
export default authSlice.reducer
