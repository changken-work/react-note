export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = email => {
  return {
    type: LOGIN,
    payload: {
      email,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: {
      email: '',
    },
  };
};
