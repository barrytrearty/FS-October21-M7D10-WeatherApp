import { initialState } from "../store";
import { SET_USERNAME, SET_DEFAULT_CITY } from "../actions";

export const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case SET_DEFAULT_CITY:
      return {
        ...state,
        defaultCity: action.payload,
      };
    default:
      return state;
  }
};
