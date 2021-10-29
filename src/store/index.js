import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { weatherReducer } from "../reducers/weatherReducer";
import { citiesReducer } from "../reducers/citiesReducer";
import { userReducer } from "../reducers/userReducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const componseEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  weatherToday: { Dublin: [] },
  cities: { favorites: [] },
  user: { username: "", defaultCity: "" },
};

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const mainReducer = combineReducers({
  weatherToday: weatherReducer,
  cities: citiesReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, mainReducer);

const configureStore = createStore(
  persistedReducer,
  initialState,
  componseEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(configureStore);

export { configureStore, persistor };
