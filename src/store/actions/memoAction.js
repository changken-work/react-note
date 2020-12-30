import * as firebase from 'firebase';

export const READ_MEMO = 'READ_MEMO';
export const ADD_MEMO = 'ADD_MEMO';

export const readMemo = (memos) => {
  return {
    type: READ_MEMO,
    payload: {
      memos
    },
  };
};

// 新增
export const addMemo = (memos) => {
  return {
    type: ADD_MEMO,
    payload: {
      title,
      content
    },
  };
};

// redux-thunk
export const readMemoAsync = () => async dispatch => {
  try {
        const notes = [];
        const db = firebase.firestore();
        // "MeRcqDluKIWS1jjvmiN8"之後改成current user uid
        const querySnapshot = await db.collection("users").doc(uid).collection("notes").get();
        querySnapshot.forEach((doc) => {
            const newMemos = {
                title: doc.data().title,
                content: doc.data().content,
            }
            // console.log("redux", newMemos);
            notes.push(newMemos)
        });//foreach
        console.log("fetching",notes);
        dispatch(readMemo(notes));
    }//try
    catch (e) { console.log(e); }
};

export const addMemoAsync = () => async dispatch => {
  try {
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
