import React, { FC, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ReactComponent as Logo } from "../assets/images/leaf.svg";
import PaymentIcon from "@material-ui/icons/Payment";
import {
	HeaderWrapper,
	FirstHalf,
	Header,
	LogoWrapper,
	TotalWrapper,
	ShippingText,
	ImageWrapper,
	CrumbWrapper,
	ProductsWrapper,
	BreadCrumbs,
	PastBreadCrumb,
	DetailsWrapper,
	DetailsOuterWrapper,
	HorizontalLine,
	CurrentBreadCrumb,
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
import { v4 as uuidv4 } from "uuid";
import { lightTheme } from "../styles/Themes";
import PersonIcon from "@material-ui/icons/Person";
import { Button, makeStyles } from "@material-ui/core";
import { addToOrders } from "../store/actions";
import devices from "../styles/devices";
import { useAuth0 } from "@auth0/auth0-react";
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
	const { user, isAuthenticated } = useAuth0();
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
			theme === "light" ? LightThemeUserLottie : DarkThemeUserLottie,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	const cardLottieOptions = {
		loop: false,
		autoplay: true,
		animationData:
			theme === "light" ? LightThemeCardLottie : DarkThemeCardLottie,
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
			if (candle._id === id) {
				result = candle.image;
			}
		});

		return result;
	};

	const formatAddress = () => {
		if (
			address !== "" &&
			postalCode !== 0 &&
			city !== "" &&
			region !== null &&
			region !== ""
		) {
			return `${address} ${city}, ${region}, ${postalCode}`;
		} else {
			return "None";
		}
	};

	const handleBackToShipping = () => {
		history.push("/checkout/shipping");
	};
	const getRandomArbitrary = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	const handleCompleteOrder = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const orderNumber = getRandomArbitrary(2000, 4000);
		if (isAuthenticated) {
			dispatch(
				addToOrders(
					cart,
					user?.sub!,
					orderNumber,
					shippingMethod,
					Math.round((total + Number.EPSILON) * 100) / 100,
					"auth"
				)
			);
		} else {
			dispatch(
				addToOrders(
					cart,
					userID,
					orderNumber,
					shippingMethod,
					Math.round((total + Number.EPSILON) * 100) / 100,
					"guest"
				)
			);
		}

		history.replace("/checkout/success");
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
			<PaymentFirstHalf>
				<PaymentHeaderWrapper>
					<Header>
						<LogoWrapper>
							<ImageWrapper>
								<Logo />
							</ImageWrapper>

							<h2>Candleaf</h2>
						</LogoWrapper>
					</Header>
					<BreadCrumbs>
						<CrumbWrapper>
							<PastBreadCrumb>Cart</PastBreadCrumb>
							<NavigateNextIcon />
						</CrumbWrapper>
						<CrumbWrapper>
							<PastBreadCrumb>Details</PastBreadCrumb>
							<NavigateNextIcon />
						</CrumbWrapper>
						<CrumbWrapper>
							<PastBreadCrumb>Shipping</PastBreadCrumb>
							<NavigateNextIcon />
						</CrumbWrapper>
						<CurrentBreadCrumb>Payment</CurrentBreadCrumb>
					</BreadCrumbs>
				</PaymentHeaderWrapper>
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
							<h3>Shipping</h3>
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
			</PaymentFirstHalf>
			<PaymentSecondHalf>
				<ProductsWrapper>
					{cart.map((product) => {
						let result = handleGetImageSrc(product.productId);
						return (
							<Product
								title={product.productName}
								price={product.price}
								key={uuidv4()}
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
			</PaymentSecondHalf>
		</PaymentWrapper>
	);
};

export default withRouter(Payment);
const PaymentWrapper = styled.div`
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: flex-start;
	@media ${devices.laptopM} {
		flex-direction: column;
		height: unset;
		align-items: center;
	}
	@media ${devices.tablet} {
		font-size: 13px;
	}
`;
const PaymentFirstHalf = styled(FirstHalf)``;

const PaymentHeaderWrapper = styled(HeaderWrapper)`
	margin-bottom: 2rem;
`;

const PaymentSecondHalf = styled.div`
	background: ${(props) => props.theme.colors.secondary};
	display: flex;
	height: 100vh;

	flex-direction: column;
	padding: 2rem 0;
	justify-content: center;
	align-items: center;
	align-self: center;
	flex: 2;
	@media ${devices.laptopM} {
		height: unset;

		padding: 3rem 0;
		flex: 1;
		width: 100%;
		margin-top: 50px;
	}
	@media ${devices.mobileXL} {
		font-size: 13px;
	}
`;

const HorizontalLineUserInfo = styled(HorizontalLine)`
	border-color: ${(props) => props.theme.brand};
	width: 100%;
	margin: 15px 0;
`;

export const UserInfoWrapper = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 25px;
	padding-top: 0;
	position: relative;
	border: 3px solid
		${(props) => (props.theme === lightTheme ? props.theme.brand : "#383838")};
	border-radius: 8px;
	overflow: visible;
	margin: 10px 0;
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
		props.theme === lightTheme ? props.theme.text : props.theme.brand};
	background: ${(props) =>
		props.theme === lightTheme ? props.theme.brand : "#383838"};
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
	padding-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
	display: flex;
	width: 90%;
	margin-top: 1rem;
	justify-content: space-between;
	align-items: center;
	@media ${devices.mobileXL} {
		flex-direction: column;
		min-height: 120px;
	}
`;
const UserInfoOuterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 90%;
`;
