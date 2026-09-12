import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  register,
  logout as logoutApi,
  getMe,
} from "../api/auth";

// LOGIN
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data);

      const user = response.data.user;

      return {
        user,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al iniciar sesión"
      );
    }
  }
);

// RECUPERAR SESIÓN
export const getMeThunk = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMe();

      return {
        user: response.data.user,
      };
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

// REGISTER
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await register(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al registrarse"
      );
    }
  }
);

// LOGOUT
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await logoutApi();
    } finally {
      dispatch(logout());
    }
  }
);

const initialState = {
  token: null,
  user: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;

        // El JWT está en la cookie.
        state.token = true;
        state.user = action.payload.user;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // RECUPERAR SESIÓN
      .addCase(getMeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = true;
        state.user = action.payload.user;
      })

      .addCase(getMeThunk.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
      })

      // REGISTER
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectIsAdmin = (state) => {
  return state.auth.user?.role === "ADMIN";
};

export default authSlice.reducer;