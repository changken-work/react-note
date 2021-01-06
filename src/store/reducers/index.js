// 整合所有reducer
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import labelReducer from "./labelReducer";
import checkboxReducer from "./checkboxReducer";
import checkListReducer from "./checkListReducer";
import noteReducer from "./noteReducer";
import memoReducer from "./memoReducer";

export default combineReducers({
  auth: authReducer,
  label: labelReducer,
  checkbox: checkboxReducer,
  checkList: checkListReducer,
  note: noteReducer,
  memo: memoReducer,
});
