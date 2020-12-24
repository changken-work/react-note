export const ADD_TODOLIST = "ADD_TODOLIST";
export const DELETE_TODOLIST = "DELETE_TODOLIST";
export const FINISH_TODOLIST = "FINISH_TODOLIST";
export const REFRESH_TODOLIST = "REFRESH_TODOLIST";
export const REFRESH_FINISHLIST = "REFRESH_FINISHLIST";

function ID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export const addTodoList = (todoDec) => {
  console.log("action-addTodoList:", todoDec);
  return {
    type: ADD_TODOLIST,
    payload: {
      id: ID(),
      todoDec,
    },
  };
};

export const deleteTodo = (todoIndex) => {
  return {
    type: DELETE_TODOLIST,
    payload: todoIndex,
  };
};

export const finishTodo = (id) => {
  return {
    type: FINISH_TODOLIST,
    payload: id,
  };
};
export const refreshTodo = () => {
  return {
    type: REFRESH_TODOLIST,
  };
};
export const refreshFinish = () => {
  return {
    type: REFRESH_FINISHLIST,
  };
};
