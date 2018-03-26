import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, PROTECTED_TEST } from './AuthActions';

// Initial State
const initialState = {
  error: '',
  message: '',
  content: '',
  authenticated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case PROTECTED_TEST:
      return { ...state, content: action.payload };
    default:
      return state;
  }
};

// Export Reducer
export default AuthReducer;
