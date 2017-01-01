import { combineReducers } from "redux";

import products from "./productReducer";
import { routerReducer } from "react-router-redux";

export default combineReducers({
    products,
    routing: routerReducer,
});
