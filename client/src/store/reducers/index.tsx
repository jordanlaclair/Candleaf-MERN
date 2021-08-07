import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import candleReducer from "./candleReducer";

import storage from "redux-persist/lib/storage";

import globalReducer from "./globalReducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
	global: globalReducer,
	candles: candleReducer,
	user: userReducer,
});

export default allReducers;
export const config = {
	key: "root",
	storage: storage,
	blacklist: ["extras"],
};
export const persistedReducer = persistReducer(config, allReducers);

export type State = ReturnType<typeof allReducers>;
