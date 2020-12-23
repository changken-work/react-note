// 整合所有reducer
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import labelReducer from "./labelReducer";
import checkboxReducer from "./checkboxReducer";
import checkListReducer from "./checkListReducer";

export default combineReducers({
  auth: authReducer,
  label: labelReducer,
  checkbox: checkboxReducer,
  checkList: checkListReducer,
});
