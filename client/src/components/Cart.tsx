import { Button, makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { State } from "../store/reducers";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import CartLottie from "../assets/lotties/cart.json";
import CartItem from "./CartItem";
import Lottie from "react-lottie";
import devices from "../styles/devices";
import { v4 as uuidv4 } from "uuid";

const Cart: FC = () => {
	const history = useHistory();
	const handleBackToHome = () => {
		history.push("/");
	};

	const cart = useSelector((state: State) => state.user.cart);
	const cartTotal = useSelector((state: State) => state.user.cartTotal);

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
			<SectionOne>
				<Title>Your Cart Items</Title>
				<LottieWrapper>
					<Lottie options={defaultOptions} isClickToPauseDisabled={true} />
				</LottieWrapper>

				{cart.length === 0 || cart[0].productName === "None" ? (
					<CartEmpty>Cart Empty!</CartEmpty>
				) : (
					<CartItemWrapper>
						{cart.map((item) => {
							return (
								<CartItem
									id={uuidv4()}
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
			</SectionOne>
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
	padding: 30px 0;
	flex-direction: column;
	height: 85%;
	justify-content: space-between;
	align-items: center;
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
const SectionOne = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;

	justify-content: space-evenly;
	align-items: center;
`;
