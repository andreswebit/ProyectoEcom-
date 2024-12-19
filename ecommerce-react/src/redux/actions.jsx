//REDUX/ actions.js

export const ADD_PRODUCT = "ADD_PRODUCT";
export const ADD_USER = "ADD_USER";

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});
