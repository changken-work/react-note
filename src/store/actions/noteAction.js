import * as firebase from 'firebase';
import * as SecureStore from 'expo-secure-store';

export const READ_NOTES = 'READ_NOTES';

export const addNote = (notes) => {
    return {
        type: READ_NOTES,
        payload: {
            notes,
        },
    };
};

export const readNoteAsync = (uid) => async dispatch => {
    try {
        const notes = [];
        const db = firebase.firestore();
        // "MeRcqDluKIWS1jjvmiN8"之後改成current user uid
        const querySnapshot = await db.collection("users").doc(uid).collection("notes").get();
        querySnapshot.forEach((doc) => {
            const newNote = {
                id: doc.id,
                title: doc.data().title,
                content: doc.data().content,
            }
            // console.log("redux", newNote);
            notes.push(newNote)
        });//foreach
        console.log("fetching",notes);
        dispatch(addNote(notes));
    }//try
    catch (e) { console.log(e); }
};