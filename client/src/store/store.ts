import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./reducers/index";
export const store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
