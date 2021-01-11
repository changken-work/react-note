import {
  READ_MEMO,
  ADD_MEMO,
  UPDATE_MEMO,
  DELETE_MEMO,
  GET_DOC_ID,
} from "../actions/memoAction";

const initState = {
  notes: [],
  docID: "",
};

const memoReducer = (state = initState, action) => {
  switch (action.type) {
    case READ_MEMO: {
      let Temp = [...state.notes];
      Temp = action.payload.notes;
      // console.log("now", action.payload.notes)
      return {
        ...state,
        notes: Temp,
      };
    }
    case ADD_MEMO: {
      const Temp = [...state.notes];
      return {
        ...state,
        notes: Temp,
      };
    }
    case UPDATE_MEMO: {
      const Temp = [...state.notes];
      return {
        ...state,
        notes: Temp,
      };
    }
    case DELETE_MEMO: {
      const Temp = [...state.notes];
      Temp.splice(action.payload, 1);
      return {
        ...state,
        notes: Temp,
      };
    }
    case GET_DOC_ID: {
      return {
        docID: action.payload.DocRefId,
      };
    }

    default:
      return state;
  }
};

export default memoReducer;
