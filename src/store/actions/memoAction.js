import * as firebase from 'firebase';

export const READ_MEMO = 'READ_MEMO';
export const ADD_MEMO = 'ADD_MEMO';
export const UPDATE_MEMO = 'UPDATE_MEMO';

export const readMemo = (notes) => {
  return {
    type: READ_MEMO,
    payload: {
      notes
    },
  };
};
// 新增
export const addMemo = (title, content) => {
  return {
    type: ADD_MEMO,
    payload: {
      title,
      content
    },
  };
};
// 修改
export const updateMemo = (title, content) => {
  return {
    type: UPDATE_MEMO,
    payload: {
      title,
      content
    },
  };
};
// 刪除
export const deleteMemo = (title, content) => {
  return {
    type: DELETE_MEMO,
    payload: {
      title,
      content
    },
  };
};

// redux-thunk
export const readMemoAsync = (uid) => async dispatch => {
  try {
        const notes = [];
        const db = firebase.firestore();
        const querySnapshot = await db.collection("users").doc(uid).collection("notes").get();
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
      content: content
    });
    console.log(docRef.id);
  }
  catch(error) {
    console.error("Error adding document: ", error);
  }
  dispatch(addMemo(title, content));
};

export const updateMemoAsync = (uid, id, title, content) => async dispatch => {
  const db = firebase.firestore();
  const docRef = await db.collection("users").doc(uid).collection("notes").doc(id).set({
    title: title,
    content: content
  })
  .then(function() {
      console.log("update success!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  dispatch(updateMemo(title, content));
};

export const deleteMemoAsync = (uid, id) => async dispatch => {
  const db = firebase.firestore();
  await db.collection("users").doc(uid).collection("notes").doc(id).delete()
  .then(function() {
    console.log("delete success!");
  })
  .catch(function(error) {
      console.error("Error removing document: ", error);
  });
};
