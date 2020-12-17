import { LOGIN, LOGOUT } from "../actions/authAction";

const initState = {
  email: "",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        email: action.payload.email,
      };
    case LOGOUT:
      return {
        email: action.payload.email,
      };

    default:
      return state;
  }
};

export default authReducer;
