import postReducer from "./postReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({
	posts: postReducer,
});

export default allReducers;
