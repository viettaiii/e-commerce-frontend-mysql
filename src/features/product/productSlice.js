import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsAsync, createProductAsync } from "./productThunk";
import { toast } from "react-toastify";
const initialState = {
  products: [],
  isLoading: false,
  isError: false,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (params, thunkAPI) => {
    return await getProductsAsync("/products", { params }, thunkAPI);
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (inputs, thunkAPI) => {
    return await createProductAsync("/products", inputs, thunkAPI);
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CASE GET ALL PRODUCTS
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
      state.products = action.payload.data;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });

    // CASE CREATE PRODUCT
    builder.addCase(createProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
      toast(action.payload.message);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = state.isError = true;
      toast(action.payload.message);
    });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
