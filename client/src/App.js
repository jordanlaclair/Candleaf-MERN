import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import Checkout from "./components/Checkout.js";
import Header from "./components/Header.js";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	BrowserRouter,
} from "react-router-dom";

import * as action from "./store/actions/index.js";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(action.getPosts());
	}, [dispatch]);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/">
						<Header />
						<Home />
					</Route>
					<Route exact path="/checkout" component={Checkout} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
