import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types';

export default function user(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginInfo: action.payload };

    case REGISTER_USER:
      return { ...state, registerInfo: action.payload };

    case AUTH_USER:
      return { ...state, userInfo: action.payload };

    default:
      return state;
  }
}
