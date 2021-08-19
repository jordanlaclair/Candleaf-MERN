import React, { FC, useEffect, useRef } from "react";
import { useHistory, withRouter } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ReactComponent as Logo } from "../assets/images/leaf.svg";
import PaymentIcon from "@material-ui/icons/Payment";
import {
	HeaderWrapper,
	CheckoutWrapper,
	FirstHalf,
	SecondHalf,
	Header,
	LogoWrapper,
	TotalWrapper,
	CouponWrapper,
	ShippingText,
	ImageWrapper,
	InputField,
	ProductsWrapper,
	BreadCrumbs,
	PastBreadCrumb,
	DetailsWrapper,
	DetailsOuterWrapper,
	HorizontalLine,
	CurrentBreadCrumb,
	LocationWrapper,
	NextBreadCrumb,
} from "./Checkout";
import Product from "./Product";
import { ButtonWrapper } from "./Shipping";
import CheckMarkLottie from "../assets/lotties/checkmark.json";
import { useSelector } from "react-redux";
import { State } from "../store/reducers";
import styled from "styled-components";
import Lottie from "react-lottie";
import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
const OrderComplete: FC = () => {
	const history = useHistory();
	const firstName = useSelector((state: State) => state.user.firstName);
	const cart = useSelector((state: State) => state.user.cart);
	const candles = useSelector((state: State) => state.candles);
	const total = useSelector((state: State) => state.user.total);
	const shippingCost = useSelector((state: State) => state.user.shippingCost);
	const shippingMethod = useSelector(
		(state: State) => state.user.shippingMethod
	);
	const userEmail = useSelector((state: State) => state.user.email);

	const couponDiscount = useSelector(
		(state: State) => state.user.couponDiscount
	);
	const newsLetterDiscount = useSelector(
		(state: State) => state.user.newsLetterDiscount
	);
	const theme = useSelector((state: State) => state.global.theme);
	const cartTotal = useSelector((state: State) => state.user.cartTotal);
	const [checkMarkIsStopped, setCheckMarkIsStopped] = useState(false);

	const checkMarkLottieOptions = {
		loop: false,
		autoplay: true,
		animationData: CheckMarkLottie,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const useStyles = makeStyles(() => ({
		button: {
			backgroundColor: "#54AD1A",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));
	const classes = useStyles();
	const roundToNearestTenths = (value: number) => {
		return `$${Math.round((value + Number.EPSILON) * 100) / 100}`;
	};

	const returnShipping = (shippingCost: number) => {
		let cost = roundToNearestTenths(shippingCost);
		return `${cost} - ${shippingMethod}`;
	};

	const handleGetImageSrc = (id: string) => {
		let result: string = "";
		candles.forEach((candle) => {
			if (candle._id == id) {
				result = candle.image;
			}
		});

		return result;
	};

	const handleBackToHome = () => {
		history.push("/");
	};

	const getRandomArbitrary = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	return (
		<PaymentWrapper>
			<OrderCompleteFirstHalf>
				<HeaderWrapperShipping>
					<Header>
						<LogoWrapper>
							<ImageWrapper>
								<Logo />
							</ImageWrapper>

							<h2>Candleaf</h2>
						</LogoWrapper>
					</Header>
					<BreadCrumbs>
						<PastBreadCrumb>Cart</PastBreadCrumb>
						<NavigateNextIcon />
						<PastBreadCrumb>Details</PastBreadCrumb>
						<NavigateNextIcon />
						<PastBreadCrumb>Shipping</PastBreadCrumb>
						<NavigateNextIcon />
						<CurrentBreadCrumb>Payment</CurrentBreadCrumb>
					</BreadCrumbs>
				</HeaderWrapperShipping>

				<LottieWrapper>
					<Lottie
						options={checkMarkLottieOptions}
						isStopped={checkMarkIsStopped}
						isClickToPauseDisabled={true}
					/>
				</LottieWrapper>
				<h1>Payment Confirmed!</h1>
				<h4>{`Order #${getRandomArbitrary(2000, 4000)}`}</h4>
				<h5>{`Thank you, ${firstName}, for purchasing from Candleaf. The earth is grateful of your descision to buy our eco-friendly candles. Now that your order has been confirmed, please wait unti you receive an email notifying you that your order has been shipped.`}</h5>
				<PaymentButtonWrapper>
					<Button
						variant="contained"
						className={classes.button}
						startIcon={<HomeIcon />}
						onClick={handleBackToHome}
					>
						<h3>Back to Shopping</h3>
					</Button>
				</PaymentButtonWrapper>
			</OrderCompleteFirstHalf>
			<SecondHalf>
				<ProductsWrapper>
					{cart.map((product) => {
						let result = handleGetImageSrc(product.productId);
						return (
							<Product
								title={product.productName}
								price={product.price}
								image={result}
								productId={product.productId}
								productQuantity={product.productQuantity}
								showQuantity={true}
								showAddToCart={false}
							/>
						);
					})}
				</ProductsWrapper>
				<HorizontalLine />

				<DetailsOuterWrapper>
					<DetailsWrapper>
						<h3>Subtotal</h3>
						<h3>{roundToNearestTenths(cartTotal)}</h3>
					</DetailsWrapper>
					<DetailsWrapper>
						<h3>Coupon Code</h3>
						<h3> {couponDiscount === 0 ? "None" : `-$${couponDiscount}`}</h3>
					</DetailsWrapper>
					<DetailsWrapper>
						<h3>Discount</h3>
						<h3>
							{newsLetterDiscount === 0 ? "None" : `-$${newsLetterDiscount}`}
						</h3>
					</DetailsWrapper>
					<DetailsWrapper>
						<h3>Shipping</h3>
						<ShippingText>
							{shippingCost === 0
								? "Please select shipping"
								: `${returnShipping(shippingCost)}`}
						</ShippingText>
					</DetailsWrapper>
				</DetailsOuterWrapper>
				<HorizontalLine />
				<TotalWrapper>
					<h3>Total</h3>

					<h2>{roundToNearestTenths(total)}</h2>
				</TotalWrapper>
			</SecondHalf>
		</PaymentWrapper>
	);
};

export default withRouter(OrderComplete);

const PaymentWrapper = styled(CheckoutWrapper)``;

const HorizontalLineUserInfo = styled(HorizontalLine)`
	border-color: ${(props) => props.theme.brand};
	width: 100%;
	margin: 15px 0;
`;

const LottieWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 250px;
	margin-right: 20px;
`;

const OrderCompleteFirstHalf = styled(FirstHalf)`
	flex: 2;
	justify-content: space-evenly;
	padding: 30px 50px;

	> h5 {
		margin-top: 15px;
	}
`;

const PaymentButtonWrapper = styled(ButtonWrapper)`
	justify-content: center;
`;
const HeaderWrapperShipping = styled(HeaderWrapper)`
	align-self: flex-start;
	margin: 0px;
	margin-bottom: 3rem;
`;
