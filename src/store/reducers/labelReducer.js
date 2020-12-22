import {
  ADD_LABEL,
  DEL_LABEL,
  DEL_LABEL_ALL,
  EDIT_TAG,
} from "../actions/labelAction";

const initState = {
  todoList: [],
  finishList: [],
  label: [{ id: "001", label: "初始值", tag: "初始值" }],
};

const labelReducer = (state = initState, action) => {
  switch (action.type) {
    // label新增
    case ADD_LABEL: {
      const Temp = [...state.label];
      Temp.push(action.payload);
      return {
        ...state,
        label: Temp,
      };
    }
    // label刪除單一
    case DEL_LABEL: {
      const Temp = [...state.label];
      // 將傳進來的Index位置刪除掉
      Temp.splice(action.payload, 1);
      return {
        ...state,
        label: Temp,
      };
    }
    // label刪除全部
    case DEL_LABEL_ALL: {
      const tempTodo = [];
      return {
        label: tempTodo,
      };
    }
    // 修改tag
    case EDIT_TAG: {
      const foundIndex = state.label.findIndex(
        (x) => x.id == action.payload.index
      );
      state.label[foundIndex].tag = action.payload.tag;
    }

    default:
      return state;
  }
};

export default labelReducer;
