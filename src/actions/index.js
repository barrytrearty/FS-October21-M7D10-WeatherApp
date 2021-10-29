export const SET_USERNAME = "SET_USERNAME";
export const SET_DEFAULT_CITY = "SET_DEFAULT_CITY";

export const setUsernameAction = (username) => ({
  type: SET_USERNAME,
  payload: username,
});

export const setDefaultCityAction = (city) => ({
  type: SET_DEFAULT_CITY,
  payload: city,
});
