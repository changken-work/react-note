import {
  ADD_TODOLIST,
  DELETE_TODOLIST,
  FINISH_TODOLIST,
  REFRESH_TODOLIST,
  REFRESH_FINISHLIST,
} from "../actions/checkListAction";

const initState = {
  todoList: [],
  finishList: [],
};

const checkListReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODOLIST: {
      const tempTodo = [...state.todoList];
      tempTodo.push(action.payload);
      console.log("reducer-ADD_TODOLIST:", tempTodo);
      return {
        ...state,
        todoList: tempTodo,
      };
    }
    case DELETE_TODOLIST: {
      const tempTodo = [...state.todoList];
      // 將傳進來的Index位置刪除掉
      tempTodo.splice(action.payload, 1);
      console.log("delete state todoList:", tempTodo);

      return {
        ...state,
        todoList: tempTodo,
      };
    }

    case FINISH_TODOLIST: {
      const TempFinish = [...state.finishList];
      TempFinish.push(action.payload);
      console.log("finish state finishList:", TempFinish);

      return {
        ...state,
        finishList: TempFinish,
      };
    }
    case REFRESH_TODOLIST: {
      const tempTodo = [...state.todoList];
      const TempFinish = [...state.finishList];

      console.log("state-REFRESH_TODOLIST");
      // 將傳進來的Index位置刪除掉
      tempTodo.splice(0, tempTodo.length);
      TempFinish.splice(0, TempFinish.length);

      // console.log("...state.todoList:", state.todoList);

      return {
        ...state,
        todoList: tempTodo,
        finishList: TempFinish,
      };
    }
    case REFRESH_FINISHLIST: {
      const TempFinish = [...state.finishList];

      console.log("state-REFRESH_FINISHLIST");
      // 將傳進來的Index位置刪除掉
      TempFinish.splice(0, TempFinish.length);

      // console.log("...state.todoList:", state.todoList);

      return {
        ...state,
        finishList: TempFinish,
      };
    }
    default:
      return state;
  }
};

export default checkListReducer;
