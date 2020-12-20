export const READLIST = "READLIST";
export const SETMODALVISIBLE = "SETMODALVISIBLE";
export const readList = (listId, title, eachCheckbox) => {
  return {
    type: READLIST,
    payload: {
      listId,
      title,
      eachCheckbox,
    },
  };
};
export const changeModalVisible = (TORF) => {
  return {
    type: SETMODALVISIBLE,
    payload: {
      TORF,
    },
  };
};
