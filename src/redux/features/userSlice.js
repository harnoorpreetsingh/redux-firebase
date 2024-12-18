import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { toast } from "sonner";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (id, thunkApi) => {
    // console.log(id, "id befo try");
    try {
      const getData = doc(db, "users", id);
      const getSnap = await getDoc(getData);
      if (getSnap.exists()) {
        // console.log(getSnap.data(), "getSnap Data in Slice");
        return getSnap.data();
      }
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUserWithEmail",
  async ({ email, password, name }, thunkApi) => {
    // console.log(email, password);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        name,
        email,
        blocked: [],
        id: res.user.uid,
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      // console.log(res, "rererererere");
      if (res) {
        console.log(res, "User created successfully");
        toast.success("User created Successfully!!");
      }
    } catch (error) {
      // console.error(error)
      console.log(error.message);
      if (error?.message == "Firebase: Error (auth/email-already-in-use).") {
        toast.error("Email Already Exists!");
      }
      throw thunkApi.rejectWithValue(error.res?.data);
    }
  }
);

export const signUpWithGoogle = createAsyncThunk(
  "users/signUpWithGoogle",
  async (data, thunkApi) => {
    const Provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, Provider);
      if (res) {
        console.log(res, "Signed up Succesfully with Google!");
        toast.success("Signed up Succesfully with Google!");
      }
    } catch (error) {
      console.error(error, "error in signing up from Google");
      toast.error(
        "Coudn't SignUp. Please Try Again (or Later if issue persists continously.) "
      );
      throw thunkApi.rejectWithValue(error.res?.data);
    }
  }
);

export const logOut = createAsyncThunk(
  "users/logOut",
  async (auth, thunkApi) => {
    try {
      const res = await signOut(auth);
      if (res) {
        console.log(res, "logged out");
      }
    } catch (error) {
      console.error(error, "error logging outt!");
      throw thunkApi.rejectWithValue(error.res?.data);
    }
  }
);

export const login = createAsyncThunk("users/login", async (data, thunkApi) => {
  // console.log(data, "login data before thunkllll");
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    if (res) {
      console.log(res, "signin successful");
      toast.success("Login Success!");
    }
  } catch (error) {
    if (error?.message == "Firebase: Error (auth/invalid-credential).") {
      toast.error("Invalid Credentials!");
    }
    throw thunkApi.rejectWithValue(error.res?.data);
  }
});

export const loginWithGoogle = createAsyncThunk(
  "users/loginWithGoogle",
  async (data, thunkApi) => {
    const Provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, Provider);
      if (res) {
        console.log(res, "Logged In with Google");
        toast.success("Logged In Succesfully with Google!");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Coudn't LogIn. Please Try Again (or Later if issue persists continously.) "
      );
      throw thunkApi.rejectWithValue(error.res?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: true,
    userData: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(signUpWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpWithGoogle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signUpWithGoogle.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchUser.pending,(state)=>{
        state.isLoading=true
      })
      .addCase(fetchUser.fulfilled,(state,action)=>{
        state.userData=action.payload
        
        state.isLoading=false
      })
      .addCase(fetchUser.rejected,(state,action)=>{
        state.error=action.payload
        state.isLoading=false
        state.userData=null
      })
  },
});

export const userSliceReducer = userSlice.reducer;
