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
            let Temp = [...state.notes];
            Temp = action.payload.notes;
            // console.log("data", action.payload.notes)
            return {
                ...state,
                notes: Temp,
            };
        }
        default:
            return state;
    }
};

export default noteReducer;
