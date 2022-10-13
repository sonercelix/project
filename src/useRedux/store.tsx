import { combineReducers, createStore } from "redux";
import { OrderReducer } from "./reducers/OrderReducer";
export const combine = combineReducers({
  OrderReducer,
});

export const store = createStore(combine);
