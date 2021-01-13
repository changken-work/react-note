import * as firebase from "firebase";

export const READ_MEMO = "READ_MEMO";

export const GET_DOC_ID = "GET_DOC_ID";

export const readMemo = (notes) => {
  return {
    type: READ_MEMO,
    payload: {
      notes,
    },
  };
};

export const getDocId = (DocRefId) => {
  return {
    type: GET_DOC_ID,
    payload: {
      DocRefId,
    },
  };
};

// redux-thunk
export const readMemoAsync = (uid) => async (dispatch) => {
  try {
    const notes = [];
    const db = firebase.firestore();
    const querySnapshot = await db
      .collection("users")
      .doc(uid)
      .collection("notes")
      .orderBy("datetime")
      .get();
    querySnapshot.forEach((doc) => {
      const newMemo = {
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        tag: doc.data().tag,
      };
      // console.log("redux", newMemo);
      notes.push(newMemo);
    }); //foreach
    // console.log("fetching",notes);
    dispatch(readMemo(notes));
  } catch (e) {
    //try
    console.log(e);
  }
};

export const addMemoAsync = (uid, title, content, tag) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    const docRef = await db
      .collection("users")
      .doc(uid)
      .collection("notes")
      .add({
        title: title,
        content: content,
        tag,
        datetime: new Date(),
      });
    //該筆新增之隨機產生doc_id
    // let doc_id = docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
  dispatch(readMemoAsync(uid));
};

export const updateMemoAsync = (uid, id, title, content, tag) => async (
  dispatch
) => {
  try {
    const db = firebase.firestore();
    await db.collection("users").doc(uid).collection("notes").doc(id).update({
      title: title,
      content: content,
      tag,
      datetime: new Date(),
    });
    console.log("update success!(updateMemoAsync)");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
  dispatch(readMemoAsync(uid));
};

export const deleteMemoAsync = (uid, id) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    await db.collection("users").doc(uid).collection("notes").doc(id).delete();
    console.log("delete success!(deleteMemoAsync)");
  } catch (error) {
    console.error("Error removing document: ", error);
  }
  dispatch(readMemoAsync(uid));
};
