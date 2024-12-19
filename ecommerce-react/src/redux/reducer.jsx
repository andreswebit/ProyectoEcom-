//REDUX/ reducer.js
import { ADD_PRODUCT, ADD_USER } from "./actions";

const initialState = {
  products: [],
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
};

export default reducer;
