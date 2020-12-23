import { READLIST } from "../actions/checkboxAction";
import { SETMODALVISIBLE } from "../actions/checkboxAction";

const initState = {
  listUid: "",
  modalVisible: false,
  checkList: [],
};

const checkboxReducer = (state = initState, action) => {
  switch (action.type) {
    case READLIST: {
      const tempList = [...state.checkList];
      tempList.push(action.payload);
      return {
        ...state,
        checkList: tempList,
      };
    }
    case SETMODALVISIBLE: {
      console.log("modalVisible-state:", state.modalVisible);
      console.log("paayload:", action.payload.TORF);
      return {
        modalVisible: action.payload.TORF,
      };
    }
    default:
      return state;
  }
};

export default checkboxReducer;
