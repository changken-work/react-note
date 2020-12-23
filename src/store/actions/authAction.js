import * as firebase from 'firebase';
import * as SecureStore from 'expo-secure-store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (uid, email) => {
  return {
    type: LOGIN,
    payload: {
      uid,
      email,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: {
      uid: '',
      email: '',
    },
  };
};

// redux-thunk
export const loginAsync = (email, password) => async dispatch => {
  const res = await firebase.auth().signInWithEmailAndPassword(email, password);
  const account = { uid: res.user.uid, email, password };
  const accountString = JSON.stringify(account);
  await SecureStore.setItemAsync('account', accountString);
  dispatch(login(res.user.uid, email));
};

export const loginAutoAsync = setStateCallback => async dispatch => {
  const accountString = await SecureStore.getItemAsync('account');
  const { uid, email, password } = JSON.parse(accountString);

  // use setStateCallback
  setStateCallback(email, password);

  dispatch(login(uid, email));
};

export const logoutAsync = () => async dispatch => {
  const res = await firebase.auth().signOut();
  await SecureStore.deleteItemAsync('account');
  dispatch(logout());
};
