import { READ_MEMO, ADD_MEMO } from '../actions/memoAction';

const initState = {
  memos: [],
};

const memoReducer = (state = initState, action) => {
  switch (action.type) {
    case READ_MEMO: {
      console.log(action.payload.memos);
      return {
          memos: action.payload.memos,
      };
    }
    default:
        return state;
  }
};

export default memoReducer;
