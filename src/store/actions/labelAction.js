import * as firebase from "firebase";
import * as FirebaseCore from "expo-firebase-core";
import * as SecureStore from "expo-secure-store";

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
}

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

export const addAsync = () => async (dispatch) => {
  const db = firebase.firestore();
  const usersDb = db.collection("users").doc("5M0z9HKOTghNOGxEDl8CKrWuQh43");
  const checkboxes = usersDb.collection("checkboxes");
  // C set()
  // await checkboxes.doc("test").set({ married: false });

  // R get()
  var docRef = checkboxes.doc("test");
  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("doc data:", doc.data());
      } else {
        console.log("無此資料夾");
      }
    })
    .catch((error) => {
      console.log("Errir getting document:", error);
    });

  // U update()
  await checkboxes.doc("test").update({
    tag: [
      { id: "t01", data: "健身" },
      { id: "t02", data: "健身2" },
    ],
  });

  // D delete()
};
