export default {
  SET_PRODUCTS: (state, payload) => {
    state.productList = payload;
  },
  ADD_PRODUCT: (state, payload) => {
    state.productList.push(payload);
  },
  DELETE_PRODUCT: (state, payload) => {
    state.productList = state.productList.filter(
      (product) => product.id != payload
    );
  },
  UPDATE_PRODUCT: (state, payload) => {
    state.productList = state.productList.map((product) =>
      product.id == payload.id ? payload : product
    );
  },
};

//mutations are the one who updates the state.
