import { combineReducers } from "redux";

import postReducer from "./postReducer";

const allReducers = combineReducers({
	posts: postReducer,
});

export default allReducers;

export type State = ReturnType<typeof allReducers>;
