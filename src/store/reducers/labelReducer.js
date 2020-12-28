import {
  ADD_LABEL,
  DEL_LABEL,
  DEL_LABEL_ALL,
  EDIT_TAG,
} from "../actions/labelAction";

const initState = {
  todoList: [],
  finishList: [],
  label: [
    {
      id: "001",
      label: "初始值",
      tag: [
        { id: "t01", data: "學校" },
        { id: "t02", data: "健身" },
      ],
    },
    {
      id: "002",
      label: "初始值",
      tag: [
        { id: "t01", data: "家人" },
        { id: "t02", data: "健身" },
      ],
    },
  ],
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

    // 修改該index之tag
    case EDIT_TAG: {
      const foundIndex = state.label.findIndex(
        (x) => x.id == action.payload.index
      );
      state.label[foundIndex].tag = action.payload.finalTags;
    }

    default:
      return state;
  }
};

export default labelReducer;
