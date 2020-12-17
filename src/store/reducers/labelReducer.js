import {
  ADD_TODOLIST,
  DELETE_TODOLIST,
  FINISH_TODOLIST,
  ADD_LABEL,
  DEL_LABEL,
} from "../actions/labelAction";

const initState = {
  todoList: [],
  finishList: [],
  label: "初始值",
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
    case ADD_LABEL: {
      return {
        label: action.payload.label,
      };
    }
    case DEL_LABEL: {
      return {
        label: action.payload,
      };
    }
    default:
      return state;
  }
};

export default labelReducer;
