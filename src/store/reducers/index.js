// 整合所有reducer
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import labelReducer from "./labelReducer";
import checkboxReducer from "./checkboxReducer";

export default combineReducers({
  auth: authReducer,
  label: labelReducer,
  checkbox: checkboxReducer,
});
