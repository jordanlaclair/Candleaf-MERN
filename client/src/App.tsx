import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { State } from "./store/reducers/index";
import * as action from "./store/actions/index";

function App() {
	const posts = useSelector((state: State) => state.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(action.getPosts());
	}, []);
	useEffect(() => {
		console.log(posts);
	}, [posts]);

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
