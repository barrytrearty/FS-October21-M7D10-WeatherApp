import { initialState } from "../store";
import {
  SET_USERNAME,
  SET_DEFAULT_CITY,
  ADD_CITY_TO_FAVORITES,
} from "../actions";

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
    case ADD_CITY_TO_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? [...state.favorites]
          : [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};
