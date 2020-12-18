// 整合所有reducer
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import labelReducer from "./labelReducer";

export default combineReducers({
  auth: authReducer,
  label: labelReducer,
});
