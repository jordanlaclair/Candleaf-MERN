import { combineReducers } from "redux";

import candleReducer from "./candleReducer";
import globalReducer from "./globalReducer";

const allReducers = combineReducers({
	global: globalReducer,
	candles: candleReducer,
});

export default allReducers;

export type State = ReturnType<typeof allReducers>;
