export const ADD_LABEL = "ADD_LABEL";
export const DEL_LABEL = "DEL_LABEL";
export const DEL_LABEL_ALL = "DEL_LABEL_ALL";
export const EDIT_TAG = "EDIT_TAG";

function ID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// label_demo
export const add = (label, TagsArray) => {
  let finalTags = [];
  TagsArray.map((obj) => {
    finalTags.push({ id: ID(), data: obj });
  });
  return {
    type: ADD_LABEL,
    payload: {
      id: ID(),
      label,
      tag: finalTags,
    },
  };
};

export const del = (index) => {
  return {
    type: DEL_LABEL,
    payload: index,
  };
};
export const delAll = () => {
  return {
    type: DEL_LABEL_ALL,
    payload: "",
  };
};

export const editTag = (index, TagsArray) => {
  let finalTags = [];
  TagsArray.map((obj) => {
    finalTags.push({ id: ID(), data: obj });
  });
  return {
    type: EDIT_TAG,
    payload: {
      index,
      finalTags,
    },
  };
};
