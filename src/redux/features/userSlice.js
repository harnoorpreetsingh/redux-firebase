import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {auth} from "../../firebase/config"


export const createUser = createAsyncThunk("users/createUserWithEmail",
    async(data,thunkApi)=>{
        try {
           const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
           if(res){
            console.log(res,"User created successfully")
           }
        } catch (error) {
            console.error(error)
            throw thunkApi.rejectWithValue(error.res?.data)
        }
    }
)

export const signUpWithGoogle=createAsyncThunk("users/signUpWithGoogle",
    async(_,thunkApi)=>{
        const Provider = new GoogleAuthProvider
        try {
            const res = await signInWithPopup(auth, Provider) 
            if(res){
            console.log("Signed up Succesfully with Google!")
           }
        } catch (error) {
            console.error(error,"error in signing up from Google")
            throw thunkApi.rejectWithValue(error.res?.data)
        }
    }
)

export const logOut = createAsyncThunk("users/logOut",
    async(auth, thunkApi)=>{
        try {
           const res = await signOut( auth )
        if(res){
            console.log(res, "logged out")
        }
       } catch (error) {
        console.error(error,"error logging outt!")
        throw thunkApi.rejectWithValue(error.res?.data)
       }

    }
)

export const login= createAsyncThunk("users/login", 
    async(data, thunkApi)=>{
        try {
            const res = await signInWithEmailAndPassword(auth, data.email, data.password)
            if(res){
                console.log(res, "signin successful")
            }
        } catch (error) {
            console.error(error,"error signing in")
            throw thunkApi.rejectWithValue(error.res?.data)
        }
    }
)

export const loginWithGoogle = createAsyncThunk("users/loginWithGoogle",
    async(data,thunkApi)=>{
        const Provider = new GoogleAuthProvider
        try {
            const res = await signInWithPopup(auth, Provider)
            if(res){
                console.log(res, "Logged In with Google")
            }
        } catch (error) {
            console.error(error)
            throw thunkApi.rejectWithValue(error.res?.data)
        }
    }
)

export const userSlice = createSlice({
    name:"",
    initialState:{
        isLoading:true,
        userData:[],
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createUser.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createUser.fulfilled, (state, action)=>{
            state.userData.push(action.payload)
            state.isLoading = false;
        })
        .addCase(createUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
        .addCase(signUpWithGoogle.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(signUpWithGoogle.pending, (state, action)=>{
            state.userData.push(action.payload)
            state.isLoading = false;
        })
        .addCase(signUpWithGoogle.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
        .addCase(login.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled,(state)=>{
            state.isLoading = false;
        })
        .addCase(login.rejected,(state,action)=>{
            state.error = action.error.message;
            state.isLoading = false;
        })
    }
})