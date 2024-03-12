import axios from "axios";
//payload refers to the data that is passed to the actions when it is dispatched.
//  we use payload as an argument with context

const BASE_URL = process.env.VUE_APP_BASE_URL;

export default {
  setProducts: async (context) => {
    try {
      let result = await axios.get(`${BASE_URL}/products`);
      context.commit("SET_PRODUCTS", result.data);
    } catch (error) {
      throw new Error(error);
    }
  },
  addProduct: async (context, payload) => {
    try {
      let result = await axios.post(`${BASE_URL}/products`, payload);
      context.commit("ADD_PRODUCT", result.data);
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteProduct: async (context, payload) => {
    try {
      await axios.delete(`${BASE_URL}/products/${payload}`);
      context.commit("DELETE_PRODUCT", payload);
    } catch (error) {
      throw new Error(error);
    }
  },
  updateProduct: async (context, payload) => {
    try {
      let result = await axios.put(
        `${BASE_URL}/products/${payload.id}`,
        payload
      );
      context.commit("UPDATE_PRODUCT", result.data);
    } catch (error) {
      throw new Error(error);
    }
  },
};
