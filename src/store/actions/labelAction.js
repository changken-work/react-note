export const ADD_LABEL = 'ADD_LABEL';
export const DEL_LABEL = 'DEL_LABEL';
export const DEL_LABEL_ALL = 'DEL_LABEL_ALL';
export const EDIT_TAG = 'EDIT_TAG';

function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// label_demo
export const add = (label, tag) => {
  return {
    type: ADD_LABEL,
    payload: {
      id: ID(),
      label,
      tag,
    },
  };
};

export const delLabel = index => {
  return {
    type: DEL_LABEL,
    payload: index,
  };
};
export const delAllLabel = () => {
  return {
    type: DEL_LABEL_ALL,
    payload: '',
  };
};

export const editTag = (index, tag) => {
  return {
    type: EDIT_TAG,
    payload: { index, tag },
  };
};
