import { combineReducers } from "redux";

import postReducer from "./postReducer";
import globalReducer from "./globalReducer";

const allReducers = combineReducers({
	global: globalReducer,
	posts: postReducer,
});

export default allReducers;

export type State = ReturnType<typeof allReducers>;
