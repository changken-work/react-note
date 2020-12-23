import {
  ADD_TODOLIST,
  DELETE_TODOLIST,
  FINISH_TODOLIST,
} from "../actions/labelAction";

const initState = {
  todoList: [],
  finishList: [],
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
    default:
      return state;
  }
};

export default labelReducer;
