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
import { GlobalStyles } from "./styles/globalStyles";
import ProductDetails from "./components/ProductDetails";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/Themes";
function App() {
	const dispatch = useDispatch();
	const theme = useSelector((state: State) => state.global.theme);

	return (
		<ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
			<GlobalStyles />
			<div className="App">
				<Router>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/">
							<Header />
							<Home />
						</Route>
						<Route exact path="/checkout">
							<Header />
						</Route>
						<Route exact path="/products/candles/:id">
							<Header />
							<ProductDetails />
						</Route>
					</Switch>
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
