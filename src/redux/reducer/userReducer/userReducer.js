import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db from "../../../firebase/firebase";
import { notifySuccess } from "../../../Notification/success";
import { notifyError } from "../../../Notification/error";

const initialState = { isLoading: false, user: null };

const auth = getAuth();

// This function takes email and convert it to docId.
const getDocName = (email) => {
  return email.toLowerCase().replace("/", "-");
};

// Signup thunk for asynchronous handling for signUp
export const signUp = createAsyncThunk("user/signUp", async (payload) => {
  try {
    // new User is created using email and password.
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    const docName = getDocName(payload.email);
    // A new Doc with user.uid and name is added to Users Collection.
    await setDoc(doc(db, "Users", docName), {
      userName: payload.name,
      email: payload.email,
      userId: userCredential.user.uid,
    });

    await setDoc(doc(db, "Carts", docName), {
      userName: payload.name,
      email: payload.email,
      products: [],
      totalPrice: 0,
    });

    await setDoc(doc(db, "Orders", docName), {
      userName: payload.name,
      email: payload.email,
      orders: [],
    });

    return docName;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// SignIn thunk for asynchronous handling for signIn
export const signIn = createAsyncThunk("user/signIn", async (payload) => {
  try {
    // Sign in with email and password.
    const userCredential = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    const docName = getDocName(payload.email);

    return docName;
  } catch (error) {
    throw error;
  }
});

// authchange thunk for asynchronous handling for authChange
export const authChange = createAsyncThunk("user/authChange", async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (data) => {
      if (data) {
        const docName = getDocName(data.email);
        return resolve(docName);
      } else {
        return resolve(null);
      }
    });
  });
});

// signOutHandle thunk for asynchronous handling for signOut
export const signOutHandle = createAsyncThunk(
  "user/signOut",
  async (payload) => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }
);

// This function is to setting user and isLogin when promise from
// signIn, signUp and authChange get fullfilled.
const signInFullfilled = (state, action, message) => {
  state.isLoading = false;
  if (action.payload && !state.user) {
    state.user = action.payload;
    notifySuccess(message);
  }
};

// This is for setting isLoading when promises are pending.
const handleLoading = (state, action) => {
  state.isLoading = true;
};

// When promises are rejected.
const handleError = (state, action) => {
  state.isLoading = false;
  notifyError(action.error.code);
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling signUp thunk
      .addCase(signUp.fulfilled, (state, action) =>
        signInFullfilled(state, action, "Registration Successfull!!!")
      )
      .addCase(signUp.pending, handleLoading)
      .addCase(signUp.rejected, handleError)

      // Handling signIn thunk
      .addCase(signIn.fulfilled, (state, action) =>
        signInFullfilled(state, action, "Login Successfull!!!")
      )
      .addCase(signIn.pending, handleLoading)
      .addCase(signIn.rejected, handleError)

      // Handling authChange thunk
      .addCase(authChange.fulfilled, (state, action) =>
        signInFullfilled(state, action)
      )

      // Handling signOut thunk
      .addCase(signOutHandle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        notifySuccess("Sign out Successful!");
      })
      .addCase(signOutHandle.pending, handleLoading)
      .addCase(signOutHandle.rejected, handleError);
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelector = (state) => state.userReducer;
