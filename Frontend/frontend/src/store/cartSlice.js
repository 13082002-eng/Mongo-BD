import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

// Obtener el carrito
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener el carrito"
      );
    }
  }
);

// Añadir producto al carrito
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.post("/cart", {
        productId,
        quantity,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al añadir al carrito"
      );
    }
  }
);

// Eliminar producto completo del carrito
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/cart/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Error al eliminar del carrito"
      );
    }
  }
);

// Restar una unidad del producto
export const decreaseCartItem = createAsyncThunk(
  "cart/decreaseCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/cart/${productId}`, {
        quantity: -1,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Error al modificar el carrito"
      );
    }
  }
);

// Checkout
export const checkout = createAsyncThunk(
  "cart/checkout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/cart/checkout");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Error al realizar el checkout"
      );
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH CART
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD ITEM
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REMOVE ITEM COMPLETELY
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DECREASE ITEM
      .addCase(decreaseCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decreaseCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(decreaseCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CHECKOUT
      .addCase(checkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;