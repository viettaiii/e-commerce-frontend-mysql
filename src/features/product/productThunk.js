import httpRequest from "../../api/httpRequest";

export const getProductsAsync = async (url, params, thunkAPI) => {
  try {
    const { data } = await httpRequest.get(url, params);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};
export const createProductAsync = async (url, inputs, thunkAPI) => {
  try {
    const { data } = await httpRequest.post(url, inputs);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
