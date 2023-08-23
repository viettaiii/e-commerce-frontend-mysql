import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsAsync,
  createProductAsync,
  deleteProductAsync,deleteManyProductAsync
} from "./productThunk";
import { toast } from "react-toastify";
const initialState = {
  products: [],
  page: 1,
  perPage: 6,
  totalPages: 1,
  total: 2,
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

// Delete one product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (slug, thunkAPI) => {
    return await deleteProductAsync("/products/" + slug, thunkAPI);
  }
);

// Delete many product
export const deleteManyProduct = createAsyncThunk(
  "products/deleteManyProduct",
  async (slugs, thunkAPI) => {
    return await deleteManyProductAsync("/products/delete-many", slugs, thunkAPI);
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

      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
      state.totalPages = action.payload.totalPages;
      state.total = action.payload.total;
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

    // CASE delete product
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
      toast(action.payload.message);
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = state.isError = true;
      toast(action.payload.message);
    });

    // CASE delete many product
    builder.addCase(deleteManyProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteManyProduct.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
      toast(action.payload.message);
    });
    builder.addCase(deleteManyProduct.rejected, (state, action) => {
      state.isLoading = state.isError = true;
      toast(action.payload.message);
    });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
