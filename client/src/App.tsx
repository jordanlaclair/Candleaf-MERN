import "./App.css";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Header from "./components/Header";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { State } from "./store/reducers/index";
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
import Shipping from "./components/Shipping";
import ProtectedRoute from "./components/ProtectedRoute";
import Payment from "./components/Payment";
import OrderComplete from "./components/OrderComplete";
import Orders from "./components/Orders";
const App: FC = () => {
	const theme = useSelector((state: State) => state.global.theme);
	const cart = useSelector((state: State) => state.user.cart);
	const shippingCost = useSelector((state: State) => state.user.shippingCost);
	const { isLoading } = useAuth0();

	if (isLoading)
		return (
			<SpinnerWrapper>
				<Spinner color="green" name="ball-grid-beat" fadeIn="none" />
			</SpinnerWrapper>
		);

	return (
		<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
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
						<Route exact path="/orders">
							<Header />
							<Orders />
						</Route>

						<ProtectedRoute
							exact={true}
							path="/checkout"
							component={Checkout}
							isAuth={cart.length > 0 && cart[0].productName !== "None"}
						/>

						<ProtectedRoute
							exact={true}
							path="/checkout/shipping"
							component={Shipping}
							isAuth={cart.length > 0 && cart[0].productName !== "None"}
						/>

						<ProtectedRoute
							exact={true}
							path="/checkout/payment"
							component={Payment}
							isAuth={
								cart.length > 0 &&
								cart[0].productName !== "None" &&
								shippingCost !== 0
							}
						/>
						<Route exact path="/checkout/success">
							<OrderComplete />
						</Route>

						<Route exact path="/products/candles/:id">
							<Header />
							<ProductDetails />
						</Route>

						<Route exact path="*">
							<Redirect to="/" />
						</Route>
					</Switch>
				</Router>
			</div>
		</ThemeProvider>
	);
};

export default App;

export const SpinnerWrapper = styled.div`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;
