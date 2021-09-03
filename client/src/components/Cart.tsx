import { Button, makeStyles } from "@material-ui/core";
import React, { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { State } from "../store/reducers";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import CartLottie from "../assets/lotties/cart.json";
import CartItem from "./CartItem";
import Lottie from "react-lottie";
import devices from "../styles/devices";

const Cart: FC = () => {
	const history = useHistory();
	const handleBackToHome = () => {
		history.push("/");
	};

	const dispatch = useDispatch();
	const cart = useSelector((state: State) => state.user.cart);
	const theme = useSelector((state: State) => state.global.theme);
	const cartTotal = useSelector((state: State) => state.user.cartTotal);
	const CartLottieRef = useRef(null);
	const getSubTotal = () => {
		let subTotal = 0;
		cart.forEach((product) => {
			subTotal += product.totalPrice;
		});
		return Math.round(subTotal * 100) / 100;
	};
	const useStyles = makeStyles((theme) => ({
		button: {
			backgroundColor: "#54AD1A",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: CartLottie,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	const handleProceedCheckout = () => {
		history.push("/checkout");
	};
	const classes = useStyles();

	return (
		<CheckoutWrapper>
			<Title>Your Cart Items</Title>
			<LottieWrapper>
				<Lottie
					ref={CartLottieRef}
					options={defaultOptions}
					isClickToPauseDisabled={true}
				/>
			</LottieWrapper>

			{cart.length == 0 || cart[0].productName == "None" ? (
				<CartEmpty>Cart Empty!</CartEmpty>
			) : (
				<CartItemWrapper>
					{cart.map((item) => {
						return (
							<CartItem
								productId={item.productId}
								productName={item.productName}
								productWeight={item.productWeight}
								totalPrice={item.totalPrice}
								productQuantity={item.productQuantity}
								price={item.price}
							/>
						);
					})}
				</CartItemWrapper>
			)}

			<ProceedCheckoutWrapper>
				<ProceedCheckoutLeft>
					<Button
						variant="contained"
						className={classes.button}
						startIcon={<HomeIcon />}
						onClick={handleBackToHome}
					>
						<h3>Back to Home</h3>
					</Button>
				</ProceedCheckoutLeft>
				<SubTotalWrapper>
					<h3>Sub-Total</h3>
					<h3>${Math.round((cartTotal + Number.EPSILON) * 100) / 100}</h3>
				</SubTotalWrapper>
				<ProceedCheckoutRight>
					<Button
						variant="contained"
						className={classes.button}
						startIcon={<ShoppingCartIcon />}
						onClick={handleProceedCheckout}
					>
						<h3>Proceed to Checkout</h3>
					</Button>
				</ProceedCheckoutRight>
			</ProceedCheckoutWrapper>
		</CheckoutWrapper>
	);
};

export default Cart;

export const CheckoutWrapper = styled.div`
	display: flex;
	padding: 50px;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	align-items: center;
	width: 80%;
	margin-top: 80px;
`;

const Title = styled.h1``;
const CartItemWrapper = styled.div`
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
`;

const ProceedCheckoutWrapper = styled.div`
	display: flex;
	@media ${devices.mobileXL} {
		flex-direction: column;
		justify-content: space-between;
		min-height: 20vh;
	}
	width: 90%;

	justify-content: space-between;
	align-items: center;
`;

const SubTotalWrapper = styled.div`
	display: flex;
	white-space: nowrap;
	margin: 20px 20px;
	justify-content: center;
	align-items: center;
	> h3 {
		padding: 0px 10px;
	}
`;
const LottieWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
`;
const ProceedCheckoutRight = styled.div`
	display: flex;
	margin: 20px 0px;
	justify-content: center;
	align-items: center;
`;

const ProceedCheckoutLeft = styled.div`
	margin: 20px 0px;
`;
const CartEmpty = styled.h1`
	margin: 5rem;
	padding: 0 3rem;
`;
