import { combineReducers } from "redux";

import product from "./productReducer";
import { routerReducer } from "react-router-redux";

export default combineReducers({
    product,
    routing: routerReducer,
});
