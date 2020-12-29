import * as firebase from "firebase";
import * as FirebaseCore from "expo-firebase-core";
import * as SecureStore from "expo-secure-store";

export const ADD_LABEL = "ADD_LABEL";
export const DEL_LABEL = "DEL_LABEL";
export const DEL_LABEL_ALL = "DEL_LABEL_ALL";
export const EDIT_TAG = "EDIT_TAG";

// firebase
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
}
const db = firebase.firestore();
const usersDb = db.collection("users").doc("5M0z9HKOTghNOGxEDl8CKrWuQh43");
const checkboxes = usersDb.collection("label");

function ID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// label_demo
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

export const addAsync = (label, TagsArray) => async (dispatch) => {
  // 修改格式
  let finalTags = [];
  TagsArray.map((obj) => {
    finalTags.push({ id: ID(), data: obj });
  });

  // set()
  const id = ID();
  var docRef = checkboxes.doc(id);
  await docRef.set({ id: id, label, tag: finalTags }).catch((error) => {
    console.log("Error in set():", error);
  });
  dispatch(add(id, label, finalTags));
};

export const editTagAsync = (index, TagsArray) => async (dispatch) => {
  // 修改格式
  let finalTags = [];
  TagsArray.map((obj) => {
    finalTags.push({ id: ID(), data: obj });
  });
  // update()
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

export const deleteAsync = (index, uid) => async (dispatch) => {
  // delete doc by index
  var docRef = checkboxes.doc(uid);
  await docRef.delete().catch((error) => {
    console.log("Error in Delete():", error);
  });
  dispatch(del(index));
};
