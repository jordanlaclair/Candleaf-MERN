import React, { FC, useEffect } from "react";
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
import DarkThemeUserLottie from "../assets/lotties/darkTheme/userIcon.json";
import DarkThemeCardLottie from "../assets/lotties/darkTheme/card.json";
import LightThemeUserLottie from "../assets/lotties/lightTheme/userIcon.json";
import LightThemeCardLottie from "../assets/lotties/lightTheme/card.json";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EventIcon from "@material-ui/icons/Event";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/reducers";
import styled from "styled-components";
import UserInfoField from "./UserInfoField";
import Lottie from "react-lottie";
import { useState } from "react";
import { lightTheme } from "../styles/Themes";
import PersonIcon from "@material-ui/icons/Person";
import { Button, makeStyles } from "@material-ui/core";
import { configureStore } from "@reduxjs/toolkit";
import { addToOrders } from "../store/actions";
const Payment: FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const cart = useSelector((state: State) => state.user.cart);
	const candles = useSelector((state: State) => state.candles);
	const total = useSelector((state: State) => state.user.total);
	const shippingCost = useSelector((state: State) => state.user.shippingCost);
	const address = useSelector((state: State) => state.user.address);
	const city = useSelector((state: State) => state.user.city);
	const region = useSelector((state: State) => state.user.region);
	const postalCode = useSelector((state: State) => state.user.postalCode);
	const shippingMethod = useSelector(
		(state: State) => state.user.shippingMethod
	);
	const userID = useSelector((state: State) => state.user._id);
	const userEmail = useSelector((state: State) => state.user.email);

	const couponDiscount = useSelector(
		(state: State) => state.user.couponDiscount
	);
	const newsLetterDiscount = useSelector(
		(state: State) => state.user.newsLetterDiscount
	);
	const theme = useSelector((state: State) => state.global.theme);
	const cartTotal = useSelector((state: State) => state.user.cartTotal);
	const [userIconIsStopped, setUserIconIsStopped] = useState(false);
	const [cardLottieIsStopped, setCardLottieIsStopped] = useState(false);
	const [todaysDate, setTodaysDate] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [cardCVV, setCardCVV] = useState("");
	const userLottieOptions = {
		loop: false,
		autoplay: true,
		animationData:
			theme == "light" ? LightThemeUserLottie : DarkThemeUserLottie,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	const cardLottieOptions = {
		loop: false,
		autoplay: true,
		animationData:
			theme == "light" ? LightThemeCardLottie : DarkThemeCardLottie,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const useStyles = makeStyles((theme) => ({
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

	const handleGetImageSrc = (id: string) => {
		let result: string = "";
		candles.forEach((candle) => {
			if (candle._id == id) {
				result = candle.image;
			}
		});

		return result;
	};

	const formatAddress = () => {
		if (
			address != "" &&
			postalCode != 0 &&
			city != "" &&
			region != null &&
			region != ""
		) {
			return `${address} ${city}, ${region}, ${postalCode}`;
		} else {
			return "None";
		}
	};

	const handleBackToShipping = () => {
		history.push("/checkout/shipping");
	};

	const handleCompleteOrder = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(addToOrders(cart, userID));

		history.push("/checkout/success");
	};

	const returnShipping = (shippingCost: number) => {
		let cost = roundToNearestTenths(shippingCost);
		return `${cost} - ${shippingMethod}`;
	};

	const handleCheckCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		const re = /^[0-9\b]+$/;
		if (e.target.value === "" || re.test(e.target.value)) {
			setCardNumber(e.target.value);
		}
	};

	const handleCheckCardCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
		const re = /^[0-9\b]+$/;
		if (e.target.value === "" || re.test(e.target.value)) {
			setCardCVV(e.target.value);
		}
	};

	const returnTodaysDate = () => {
		return new Date().toISOString().split("T")[0];
	};

	useEffect(() => {
		let todaysDate = returnTodaysDate();
		setTodaysDate(todaysDate);
	}, []);

	return (
		<PaymentWrapper>
			<FirstHalf>
				<HeaderWrapper>
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
				</HeaderWrapper>
				<UserInfoOuterWrapper>
					<UserInfoWrapper
						onMouseEnter={() => {
							setUserIconIsStopped(true);
							setTimeout(() => {
								setUserIconIsStopped(false);
							}, 150);
						}}
					>
						<UserInfoHeader>
							<LottieWrapper>
								<Lottie
									options={userLottieOptions}
									isClickToPauseDisabled={true}
									isStopped={userIconIsStopped}
								/>
							</LottieWrapper>
							<h2>Customer Information</h2>
						</UserInfoHeader>
						<UserInfoField fieldName={"Contact"} fieldData={userEmail} />
						<HorizontalLineUserInfo />
						<UserInfoField fieldName={"Ship To"} fieldData={formatAddress()} />
						<HorizontalLineUserInfo />
						<UserInfoField
							fieldName={"Method"}
							shipping
							fieldData={shippingMethod}
						/>
					</UserInfoWrapper>
				</UserInfoOuterWrapper>
				<Form onSubmit={handleCompleteOrder}>
					<UserInfoWrapper
						onMouseEnter={() => {
							setCardLottieIsStopped(true);
							setTimeout(() => {
								setCardLottieIsStopped(false);
							}, 150);
						}}
					>
						<UserInfoHeader>
							<LottieWrapper>
								<Lottie
									options={cardLottieOptions}
									isClickToPauseDisabled={true}
									isStopped={cardLottieIsStopped}
								/>
							</LottieWrapper>
							<h2>Payment Information</h2>
						</UserInfoHeader>
						<PaymentInfoFieldWrapper>
							<PaymentInfoField placeholder="Name" required type="text" />
							<PersonIcon />
						</PaymentInfoFieldWrapper>
						<PaymentInfoFieldWrapper>
							<PaymentInfoField
								placeholder="Card Number"
								type="text"
								value={cardNumber}
								onChange={handleCheckCardNumber}
								minLength={16}
								required
								maxLength={16}
							/>

							<PaymentIcon />
						</PaymentInfoFieldWrapper>

						<PaymentInfoFieldBottomWrapper>
							<SmallPaymentInfoFieldWrapper>
								<SmallPaymentInfoField
									type="date"
									required
									min={todaysDate}
									placeholder="Expiration Date"
								/>
								<EventIcon />
							</SmallPaymentInfoFieldWrapper>
							<SmallPaymentInfoFieldWrapper>
								<SmallPaymentInfoField
									type="text"
									required
									value={cardCVV}
									minLength={4}
									maxLength={4}
									onChange={handleCheckCardCVV}
									placeholder="CVV"
								/>
							</SmallPaymentInfoFieldWrapper>
						</PaymentInfoFieldBottomWrapper>

						<HorizontalLineUserInfo />
					</UserInfoWrapper>
					<ButtonWrapper>
						<Button
							variant="contained"
							className={classes.button}
							startIcon={<LocalShippingIcon />}
							onClick={handleBackToShipping}
						>
							<h3>Back to Details</h3>
						</Button>

						<Button
							variant="contained"
							type="submit"
							className={classes.button}
							startIcon={<CheckCircleIcon />}
						>
							<h3>Complete Order</h3>
						</Button>
					</ButtonWrapper>
				</Form>
			</FirstHalf>
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
								: returnShipping(shippingCost)}
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

export default withRouter(Payment);

const PaymentWrapper = styled(CheckoutWrapper)``;

const HorizontalLineUserInfo = styled(HorizontalLine)`
	border-color: ${(props) => props.theme.brand};
	width: 100%;
	margin: 15px 0;
`;

export const UserInfoWrapper = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 25px;
	padding-top: 0;
	position: relative;
	border: 3px solid
		${(props) => (props.theme == lightTheme ? props.theme.brand : "#383838")};
	border-radius: 8px;
	overflow: visible;
	margin-bottom: 20px;
`;
export const UserInfoHeader = styled.div`
	display: flex;
	width: 100%;
	padding: 10px 25px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	justify-content: flex-start;
	align-items: center;
	align-self: center;
	color: ${(props) =>
		props.theme == lightTheme ? props.theme.text : props.theme.brand};
	background: ${(props) =>
		props.theme == lightTheme ? props.theme.brand : "#383838"};
	margin-bottom: 15px;
`;

const LottieWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 70px;
	margin-right: 20px;
`;
const PaymentInfoFieldWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-self: center;
	margin-bottom: 10px;
	align-items: center;
	position: relative;
	.MuiSvgIcon-root {
		position: absolute;
		top: 50%;
		right: 2%;
		transform: translate(-50%, -50%);
	}
`;
const PaymentInfoField = styled.input`
	outline: none;
	border: 1px solid black;
	background: initial;
	color: ${(props) => props.theme.text};
	font-weight: 700;
	padding: 20px;
	font-family: "Poppins", sans-serif;
	width: 100%;
	::placeholder {
		color: ${(props) => props.theme.text};
	}
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;
const PaymentInfoFieldBottomWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const SmallPaymentInfoField = styled(PaymentInfoField)`
	width: 100%;
	::-webkit-calendar-picker-indicator {
		opacity: 0;
	}
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const SmallPaymentInfoFieldWrapper = styled.div`
	width: 48%;
	position: relative;
	display: flex;
	align-items: center;

	.MuiSvgIcon-root {
		position: absolute;
		top: 50%;
		right: 2%;
		z-index: -1;
		transform: translate(-50%, -50%);
	}
`;
const Form = styled.form`
	display: flex;
	width: 90%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ButtonWrapper = styled.div`
	display: flex;
	width: 100%;
	margin-top: 2rem;
	justify-content: space-between;
	align-items: center;
`;
const UserInfoOuterWrapper = styled.div`
	width: 90%;
`;
