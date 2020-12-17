import { LOGIN, LOGOUT } from '../actions/authAction';

const initState = {
  uid: '',
  email: '',
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        uid: action.payload.uid,
        email: action.payload.email,
      };
    case LOGOUT:
      return {
        uid: action.payload.uid,
        email: action.payload.email,
      };

    default:
      return state;
  }
};

export default authReducer;
