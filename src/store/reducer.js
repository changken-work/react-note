import { LOGIN, LOGOUT } from './actions';

const initState = {
  email: '',
};

const reducer = (state = initState, action) => {
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

export default reducer;
