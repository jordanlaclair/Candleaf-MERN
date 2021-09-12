import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ReactComponent as Logo } from "../assets/images/leaf.svg";
import { PurchaseOption } from "./ProductDetails";
import Radio from "@material-ui/core/Radio";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Product from "./Product";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Lottie from "react-lottie";
import DarkModePlane from "../assets/lotties/darkTheme/plane.json";
import DarkModeTruck from "../assets/lotties/darkTheme/truck.json";
import LightModePlane from "../assets/lotties/lightTheme/plane.json";
import LightModeTruck from "../assets/lotties/lightTheme/truck.json";
import {
	HeaderWrapper,
	CrumbWrapper,
	CheckoutWrapper,
	FirstHalf,
	SecondHalf,
	Header,
	LogoWrapper,
	TotalWrapper,
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
	NextBreadCrumb,
} from "./Checkout";
import { UserInfoHeader, UserInfoWrapper } from "./Payment";
import { Button, makeStyles } from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";
import {
	updateEmail,
	updateShippingCost,
} from "../store/actions/usersActionCreator";
import { ShippingMethod } from "../store/actions/usersActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/reducers";
import { FC } from "react";
import devices from "../styles/devices";
import { useAuth0 } from "@auth0/auth0-react";

const Shipping: FC = () => {
	const [shippingMethod, setShippingMethod] = useState("");
	const [shakeShipping, setShakeShipping] = useState(false);
	const history = useHistory();
	const couponDiscount = useSelector(
		(state: State) => state.user.couponDiscount
	);
	const { user, isAuthenticated } = useAuth0();
	const newsLetterDiscount = useSelector(
		(state: State) => state.user.newsLetterDiscount
	);
	const [truckLottieIsStopped, setTruckLottieIsStopped] = useState(false);
	const [planeLottieIsStopped, setPlaneLottieIsStopped] = useState(false);
	const reduxShippingMethod = useSelector(
		(state: State) => state.user.shippingMethod
	);
	const shippingCost = useSelector((state: State) => state.user.shippingCost);
	const userID = useSelector((state: State) => state.user._id);
	const total = useSelector((state: State) => state.user.total);
	const email = useSelector((state: State) => state.user.email);
	const cartWeight = useSelector((state: State) => state.user.cartWeight);
	const address = useSelector((state: State) => state.user.address);
	const cartTotal = useSelector((state: State) => state.user.cartTotal);
	const candles = useSelector((state: State) => state.candles);
	const cart = useSelector((state: State) => state.user.cart);
	const postalCode = useSelector((state: State) => state.user.postalCode);
	const city = useSelector((state: State) => state.user.city);
	const region = useSelector((state: State) => state.user.region);
	const theme = useSelector((state: State) => state.global.theme);
	const dispatch = useDispatch();

	const useStyles = makeStyles((theme) => ({
		button: {
			backgroundColor: "#54AD1A",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));
	const classes = useStyles();
	const planeLottieOptions = {
		loop: false,
		autoplay: true,
		animationData: theme === "light" ? LightModePlane : DarkModePlane,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const truckLottieOptions = {
		loop: false,
		autoplay: true,
		animationData: theme === "light" ? LightModeTruck : DarkModeTruck,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const handleBackToDetails = () => {
		history.push("/checkout");
	};

	const handleContinueToPayment = () => {
		if (shippingMethod !== "") history.push("/checkout/payment");
		else {
			setShakeShipping(true);
			// Buttons stops to shake after 2 seconds
			setTimeout(() => setShakeShipping(false), 2000);
		}
	};

	const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShippingMethod(event.target.value);
	};

	const calculateShippingCost = (value: string) => {
		let price = 0;
		switch (value) {
			case ShippingMethod.STANDARD:
				price = cartWeight / 800 + 5;
				break;
			case ShippingMethod.EXPEDITED:
				price = cartWeight / 800 + 7;
				break;
			case ShippingMethod.NONE:
				price = 0;
				break;
			default:
				price = 0;
				break;
		}

		return roundToNearestTenths(price);
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

	const returnShipping = (shippingCost: number) => {
		let cost = roundToNearestTenths(shippingCost);
		return `${cost} - ${reduxShippingMethod}`;
	};

	useEffect(() => {
		if (shippingMethod !== "") {
			if (isAuthenticated) {
				dispatch(updateShippingCost(shippingMethod, user?.sub!, "auth"));
			} else {
				dispatch(updateShippingCost(shippingMethod, userID, "guest"));
			}
		}
	}, [shippingMethod]);

	return (
		<ShippingWrapper>
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
						<CrumbWrapper>
							<PastBreadCrumb>Cart</PastBreadCrumb>

							<NavigateNextIcon />
						</CrumbWrapper>
						<CrumbWrapper>
							<PastBreadCrumb>Details</PastBreadCrumb>

							<NavigateNextIcon />
						</CrumbWrapper>
						<CrumbWrapper>
							<CurrentBreadCrumb>Shipping</CurrentBreadCrumb>
							<NavigateNextIcon />
						</CrumbWrapper>

						<NextBreadCrumb>Payment</NextBreadCrumb>
					</BreadCrumbs>
				</HeaderWrapper>
				<InputFieldWrapper>
					<h3>Contact</h3>
					<InputFieldShipping
						placeholder="Email"
						value={email}
						defaultValue={email}
						onChange={(e) => {
							dispatch(updateEmail(e.target.value));
						}}
					/>
				</InputFieldWrapper>
				<InputFieldWrapper>
					<h3>Ship To</h3>
					<InputFieldShipping
						placeholder="Address"
						defaultValue={formatAddress()}
					/>
				</InputFieldWrapper>
				<HorizontalLineShipping />
				<UserInfoWrapperShipping
					shaking={shakeShipping}
					onClick={() => {
						setTruckLottieIsStopped(true);
						setTimeout(() => {
							setTruckLottieIsStopped(false);
						}, 150);
					}}
				>
					<UserInfoHeaderShipping>
						<LottieWrapper>
							<Lottie
								options={truckLottieOptions}
								isClickToPauseDisabled={true}
								isStopped={truckLottieIsStopped}
							/>
						</LottieWrapper>
						<h2>Shipping Method</h2>
					</UserInfoHeaderShipping>
					<OptionWrapper>
						<PurchaseOption>
							<Radio
								checked={shippingMethod === ShippingMethod.STANDARD}
								onChange={handleShippingChange}
								value={ShippingMethod.STANDARD}
								color="default"
								name="radio-button-demo"
								inputProps={{ "aria-label": "Standard Shipping" }}
							/>
							<h4
								onClick={() => {
									setShippingMethod(ShippingMethod.STANDARD);
								}}
							>
								Standard Shipping
							</h4>
						</PurchaseOption>
						<h3>{calculateShippingCost(ShippingMethod.STANDARD)}</h3>
					</OptionWrapper>
					<HorizontalLineShippingOption />

					<OptionWrapper>
						<PurchaseOption>
							<Radio
								checked={shippingMethod === ShippingMethod.EXPEDITED}
								onChange={handleShippingChange}
								value={ShippingMethod.EXPEDITED}
								color="default"
								name="radio-button-demo"
								inputProps={{ "aria-label": "Expedited Shipping" }}
							/>
							<h4
								onClick={() => {
									setShippingMethod(ShippingMethod.EXPEDITED);
								}}
							>
								Expedited Shipping
							</h4>
						</PurchaseOption>
						<h3>{calculateShippingCost(ShippingMethod.EXPEDITED)}</h3>
					</OptionWrapper>
				</UserInfoWrapperShipping>

				<ButtonWrapper>
					<Button
						variant="contained"
						className={classes.button}
						startIcon={<FormatListBulletedIcon />}
						onClick={handleBackToDetails}
					>
						<h3>Details</h3>
					</Button>

					<Button
						variant="contained"
						className={classes.button}
						startIcon={<MonetizationOnIcon />}
						onClick={handleContinueToPayment}
					>
						<h3>Payment</h3>
					</Button>
				</ButtonWrapper>
			</FirstHalf>
			<ShippingSecondHalf>
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

				<PlaneWrapper
					onClick={() => {
						setPlaneLottieIsStopped(true);
						setTimeout(() => {
							setPlaneLottieIsStopped(false);
						}, 150);
					}}
				>
					<LottieWrapperPlane>
						<Lottie
							options={planeLottieOptions}
							isStopped={planeLottieIsStopped}
							isClickToPauseDisabled={true}
						/>
					</LottieWrapperPlane>
				</PlaneWrapper>
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
							{shippingCost === 0 || shippingMethod === ""
								? "Please select shipping"
								: returnShipping(shippingCost)}
						</ShippingText>
					</DetailsWrapper>
				</DetailsOuterWrapper>
				<HorizontalLine />
				<TotalWrapper>
					<h3>Total</h3>
					<h3>
						{shippingMethod !== ""
							? roundToNearestTenths(total)
							: "Please select shipping"}
					</h3>
				</TotalWrapper>
			</ShippingSecondHalf>
		</ShippingWrapper>
	);
};

export default withRouter(Shipping);

const ShippingWrapper = styled(CheckoutWrapper)`
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

const ShippingSecondHalf = styled.div`
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

const InputFieldShipping = styled(InputField)``;

const InputFieldWrapper = styled.div`
	display: flex;
	width: 80%;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin: 10px 0;
`;

const HorizontalLineShipping = styled(HorizontalLine)`
	width: 80%;
	margin: 1rem 0;
`;

const HorizontalLineShippingOption = styled(HorizontalLine)`
	margin: 1rem 0;
`;

const OptionWrapper = styled.div`
	padding: 3px 12px;
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	background: transparent;
	border-radius: 7px;
	margin-top: 1rem;
	> h3 {
		font-weight: bold;
		color: ${(props) => props.theme.brand};
	}
`;
export const ButtonWrapper = styled.div`
	display: flex;
	width: 80%;
	margin-top: 2rem;
	padding: 2rem 0;
	justify-content: space-between;
	align-items: center;

	@media ${devices.mobileXL} {
		flex-direction: column;
		min-height: 120px;
	}
`;

interface UserShippingInfoProps {
	shaking: boolean;
}

const UserInfoWrapperShipping = styled(UserInfoWrapper)<UserShippingInfoProps>`
	width: 70%;
	animation: ${(props) =>
		props.shaking
			? `shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both`
			: "none"};

	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}

		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(4px, 0, 0);
		}
	}
`;

const UserInfoHeaderShipping = styled(UserInfoHeader)`
	padding: 0px 25px;
`;

const LottieWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 5px;
	align-items: center;
	width: 80px;
`;
const LottieWrapperPlane = styled(LottieWrapper)`
	display: flex;
	justify-content: center;
	width: 600px;
	@media ${devices.tablet} {
		width: 450px;
	}
	@media ${devices.mobileXL} {
		width: 350px;
	}
`;
const PlaneWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
