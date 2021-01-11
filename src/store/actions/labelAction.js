import * as firebase from "firebase";
import * as FirebaseCore from "expo-firebase-core";

export const GET_LABEL = "GET_LABEL";
export const ADD_LABEL = "ADD_LABEL";
export const DEL_LABEL = "DEL_LABEL";
export const DEL_LABEL_ALL = "DEL_LABEL_ALL";
export const EDIT_TAG = "EDIT_TAG";

// firebase
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
}
const db = firebase.firestore();

function ID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// label_demo
export const get = (label) => {
  return {
    type: GET_LABEL,
    payload: {
      label: label,
    },
  };
};

export const add = (id, label, finalTags) => {
  return {
    type: ADD_LABEL,
    payload: {
      id,
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

export const editTag = (index, finalTags) => {
  return {
    type: EDIT_TAG,
    payload: {
      index,
      finalTags,
    },
  };
};
export const getAsync = (user_id) => async (dispatch) => {
  try {
    const newLabel = [];
    const usersDb = db.collection("users").doc(user_id);
    const checkboxes = usersDb.collection("label");
    await checkboxes
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`);
          newLabel.push(doc.data());
        });
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    dispatch(get(newLabel));
  } catch (e) {
    // console.log(e);
    const label = [
      {
        id: "001",
        label: "您尚未登入",
        tag: [{ id: "t01", data: "" }],
      },
    ];
    dispatch(get(label));
  }
};

export const addAsync = (user_id, label, TagsArray) => async (dispatch) => {
  // 修改格式
  let finalTags = [];
  TagsArray.map((obj) => {
    finalTags.push({ id: ID(), data: obj });
  });

  // set()
  const id = ID();
  const usersDb = db.collection("users").doc(user_id);
  const checkboxes = usersDb.collection("label");
  var docRef = checkboxes.doc(id);
  await docRef.set({ id: id, label, tag: finalTags }).catch((error) => {
    console.log("Error in set():", error);
  });
  dispatch(add(id, label, finalTags));
};

export const editTagAsync = (user_id, index, TagsArray) => async (dispatch) => {
  // 修改格式
  let finalTags = [];
  TagsArray.map((obj) => {
    finalTags.push({ id: ID(), data: obj });
  });
  // update()
  const usersDb = db.collection("users").doc(user_id);
  const checkboxes = usersDb.collection("label");
  var docRef = checkboxes.doc(index);
  await docRef
    .update({
      tag: finalTags,
    })
    .catch((error) => {
      console.log("Error in Update():", error);
    });
  dispatch(editTag(index, finalTags));
};

export const deleteAsync = (user_id, index, uid) => async (dispatch) => {
  // delete doc by index
  const usersDb = db.collection("users").doc(user_id);
  const checkboxes = usersDb.collection("label");
  var docRef = checkboxes.doc(uid);
  await docRef.delete().catch((error) => {
    console.log("Error in Delete():", error);
  });
  dispatch(del(index));
};
