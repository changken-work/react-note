import {
  ADD_TODOLIST,
  DELETE_TODOLIST,
  FINISH_TODOLIST,
  ADD_LABEL,
  DEL_LABEL,
  DEL_LABEL_ALL,
} from "../actions/labelAction";

const initState = {
  todoList: [],
  finishList: [],
  label: [{ id: "001", label: "初始值" }],
};

const labelReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODOLIST: {
      const tempTodo = [...state.todoList];
      tempTodo.push(action.payload);
      return {
        ...state,
        todoList: tempTodo,
      };
    }
    case DELETE_TODOLIST: {
      const tempTodo = [...state.todoList];
      // 將傳進來的Index位置刪除掉
      tempTodo.splice(action.payload, 1);
      return {
        ...state,
        todoList: tempTodo,
      };
    }
    case FINISH_TODOLIST: {
      const TempFinish = [...state.finishList];
      TempFinish.push(action.payload);
      return {
        ...state,
        finishList: TempFinish,
      };
    }
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
    default:
      return state;
  }
};

export default labelReducer;
