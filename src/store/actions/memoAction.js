import * as firebase from 'firebase';

export const READ_MEMO = 'READ_MEMO';
export const ADD_MEMO = 'ADD_MEMO';
export const UPDATE_MEMO = 'UPDATE_MEMO';
export const GET_DOC_ID = 'GET_DOC_ID';

export const readMemo = (notes) => {
  return {
    type: READ_MEMO,
    payload: {
      notes
    },
  };
};
// 新增
export const addMemo = (notes) => {
  return {
    type: ADD_MEMO,
    payload: {
      notes
    },
  };
};
// 修改
export const updateMemo = (notes) => {
  return {
    type: UPDATE_MEMO,
    payload: {
      notes
    },
  };
};
// 刪除
export const deleteMemo = (notes) => {
  return {
    type: DELETE_MEMO,
    payload: {
      notes
    },
  };
};
export const getDocId = (DocRefId) => {
  return {
    type: GET_DOC_ID,
    payload: {
      DocRefId
    },
  };
};

// redux-thunk
export const readMemoAsync = (uid) => async dispatch => {
  try {
    const notes = [];
    const db = firebase.firestore();
    const querySnapshot = await db.collection("users").doc(uid).collection("notes").orderBy("datetime").get();
    await querySnapshot.forEach((doc) => {
        const newMemo = {
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
        }
        // console.log("redux", newMemo);
        notes.push(newMemo)
    });//foreach
    // console.log("fetching",notes);
    dispatch(readMemo(notes));
  }//try
  catch (e) { console.log(e); }
};

export const addMemoAsync = (uid, title, content) => async dispatch => {
  try {
    const db = firebase.firestore();
    const docRef = await db.collection("users").doc(uid).collection("notes").add({
      title: title,
      content: content,
      datetime: new Date()
    });
    console.log(docRef.id);
    
  }
  catch(error) {
    console.error("Error adding document: ", error);
  }
  dispatch(addMemo(notes));
};

export const updateMemoAsync = (uid, id, title, content) => async dispatch => {
  try {
    const db = firebase.firestore();
    const docRef = await db.collection("users").doc(uid).collection("notes").doc(id).set({
      title: title,
      content: content,
      datetime: new Date()
    })
    console.log("update success!");
  }
  catch(error) {
    console.error("Error writing document: ", error);
  }
  dispatch(updateMemo(notes));
};

export const deleteMemoAsync = (uid, id) => async dispatch => {
  try{
    const db = firebase.firestore();
    const docRef = await db.collection("users").doc(uid).collection("notes").doc(id).delete()
    console.log("delete success!");
  }
  catch(error) {
    console.error("Error removing document: ", error);
  }
  dispatch(deleteMemo(notes));
};
