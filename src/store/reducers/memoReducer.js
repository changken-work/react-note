import { READ_MEMO, GET_DOC_ID } from "../actions/memoAction";

const initState = {
  notes: [],
  docID: "",
};

const memoReducer = (state = initState, action) => {
  switch (action.type) {
    case READ_MEMO: {
      let Temp = [...state.notes];
      Temp = action.payload.notes;
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
      return { ...state };
  }
};

export default memoReducer;
