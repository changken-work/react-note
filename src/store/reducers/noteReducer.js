import {
    READ_NOTES,
} from '../actions/noteAction';

const initState = {
    notes: [],
};

const noteReducer = (state = initState, action) => {
    switch (action.type) {
        // label新增
        case READ_NOTES: {
            console.log("now", action.payload.notes)
            return {
                // ...state,
                notes: action.payload.notes,
            };
        }
        default:
            return state;
    }
};

export default noteReducer;
