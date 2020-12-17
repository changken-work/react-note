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
