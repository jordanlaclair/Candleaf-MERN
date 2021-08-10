import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { State } from "./store/reducers/index";
import * as action from "./store/actions/index";
import { GlobalStyles } from "./styles/globalStyles";
import ProductDetails from "./components/ProductDetails";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/Themes";
import ScrollToTop from "./components/ScrollToTop";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "react-spinkit";
import { FC } from "react";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
const App: FC = () => {
	const dispatch = useDispatch();
	const theme = useSelector((state: State) => state.global.theme);
	const { isLoading } = useAuth0();

	if (isLoading)
		return (
			<SpinnerWrapper>
				<Spinner color="green" name="ball-grid-beat" fadeIn="none" />
			</SpinnerWrapper>
		);

	return (
		<ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
			<GlobalStyles />
			<div className="App">
				<Router>
					<ScrollToTop />

					<Switch>
						<Route exact path="/">
							<Header />
							<Home />
						</Route>
						<Route exact path="/cart">
							<Header />
							<Cart />
						</Route>
						<Route exact path="/checkout">
							<Checkout />
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
};

export default App;

const SpinnerWrapper = styled.div`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;
