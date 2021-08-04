import { combineReducers } from "redux";

import candleReducer from "./candleReducer";
import globalReducer from "./globalReducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
	global: globalReducer,
	candles: candleReducer,
	user: userReducer,
});

export default allReducers;

export type State = ReturnType<typeof allReducers>;
