import cookie from 'react-cookies'

import callApi from '../../util/apiCaller';

// Export Constants
export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';
export const PROTECTED_TEST = 'protected_test';

// Export Actions
export function loginUser() {
  return {
    type: AUTH_USER,
  };
}

export function loginUserRequest({ email, password }) {  
  return function(dispatch) {
    console.log(email, password);
    return callApi('users/login', 'post', {
      user: {
        email,
        password,
      },
    }).then(res => {
      cookie.save('token', res.user.token, { path: '/' });
      dispatch(loginUser());
      window.location.href = '/';
    });
  }
}

export function registerUser() {
  return {
    type: AUTH_USER,
  };
}

export function registerUserRequest({ email, name, password }) {  
  return function(dispatch) {
    return callApi('users/register', 'post', {
      user: {
        email,
        name,
        password,        
      },
    }).then(res => {
      cookie.save('token', res.user.token, { path: '/' });
      dispatch(registerUser());
      window.location.href = '/';
    });
  }
}


export function logoutUser() {
  return {
    type: UNAUTH_USER,
  };
}

export function logoutUserRequest() {  
  return function (dispatch) {
    dispatch(logoutUser());
    cookie.remove('token', { path: '/' });

    window.location.href = '/login';
  }
}


export function protectedTest(data) {
  return {
    type: PROTECTED_TEST,
    payload: data.user,
  };
}

export function protectedTestRequest() {  
  return function(dispatch) {
    return callApi('users/protected', 'post', {}, {
      'Authorization': cookie.load('token'),
    })
    .then(res => {
      dispatch(protectedTest(res));
    })
    .catch(error => {
      dispatch(logoutUser());
      window.location.href = '/login';
    });
  }
}
