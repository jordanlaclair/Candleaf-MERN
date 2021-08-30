import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ReactComponent as Logo } from "../assets/images/leaf.svg";
import { PurchaseOption } from "./ProductDetails";
import Radio from "@material-ui/core/Radio";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Product from "./Product";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import Lottie from "react-lottie";
import DarkModePlane from "../assets/lotties/darkTheme/plane.json";
import DarkModeTruck from "../assets/lotties/darkTheme/truck.json";
import LightModePlane from "../assets/lotties/lightTheme/plane.json";
import LightModeTruck from "../assets/lotties/lightTheme/truck.json";
import { userSubmitDetails } from "../store/actions";
import {
	HeaderWrapper,
	CrumbWrapper,
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
import { UserInfoHeader, UserInfoWrapper } from "./Payment";
import { UserSubmitDetailsObject } from "../store/actions";
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
import { lightTheme } from "../styles/Themes";
import devices from "../styles/devices";

const Shipping: FC = () => {
	const [shippingMethod, setShippingMethod] = useState("");
	const history = useHistory();
	const couponDiscount = useSelector(
		(state: State) => state.user.couponDiscount
	);
	const newsLetterDiscount = useSelector(
		(state: State) => state.user.newsLetterDiscount
	);
	const [truckLottieIsStopped, setTruckLottieIsStopped] = useState(false);
	const [planeLottieIsStopped, setPlaneLottieIsStopped] = useState(false);
	const reduxShippingMethod = useSelector(
		(state: State) => state.user.shippingMethod
	);
	const shippingCost = useSelector((state: State) => state.user.shippingCost);
	const [couponCode, setCouponCode] = useState("");
	const userID = useSelector((state: State) => state.user._id);
	const firstName = useSelector((state: State) => state.user.firstName);
	const country = useSelector((state: State) => state.user.country);
	const lastName = useSelector((state: State) => state.user.lastName);
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
		animationData: theme == "light" ? LightModePlane : DarkModePlane,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const truckLottieOptions = {
		loop: false,
		autoplay: true,
		animationData: theme == "light" ? LightModeTruck : DarkModeTruck,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const handleBackToDetails = () => {
		history.push("/checkout");
	};

	const handleContinueToPayment = () => {
		let userDetails: UserSubmitDetailsObject = {
			userEmail: email,
			userFirstName: firstName,
			userLastName: lastName,
			userPostalCode: postalCode,
			userCountry: country,
			userRegion: region,
			userAddress: address,
			userCity: city,
		};

		dispatch(userSubmitDetails(userID, userDetails));

		if (shippingMethod !== "") history.push("/checkout/payment");
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

	const returnShipping = (shippingCost: number) => {
		let cost = roundToNearestTenths(shippingCost);
		return `${cost} - ${reduxShippingMethod}`;
	};

	useEffect(() => {
		if (shippingMethod !== "") {
			dispatch(updateShippingCost(shippingMethod, userID));
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
					onMouseEnter={() => {
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
						<h3>Back to Shipping</h3>
					</Button>

					<Button
						variant="contained"
						className={classes.button}
						startIcon={<MonetizationOnIcon />}
						onClick={handleContinueToPayment}
					>
						<h3>Continue to Payment</h3>
					</Button>
				</ButtonWrapper>
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

				<PlaneWrapper>
					<LottieWrapperPlane>
						<Lottie
							options={planeLottieOptions}
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
							{shippingCost === 0 || shippingMethod == ""
								? "Please select shipping"
								: returnShipping(shippingCost)}
						</ShippingText>
					</DetailsWrapper>
				</DetailsOuterWrapper>
				<HorizontalLine />
				<TotalWrapper>
					<h3>Total</h3>
					<h2>
						{shippingMethod !== ""
							? roundToNearestTenths(total)
							: "Please select shipping"}
					</h2>
				</TotalWrapper>
			</SecondHalf>
		</ShippingWrapper>
	);
};

export default withRouter(Shipping);

const ShippingWrapper = styled(CheckoutWrapper)`
	@media ${devices.mobileXL} {
		font-size: 13px;
	}
`;

const InputFieldShipping = styled(InputField)``;

const InputFieldWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin: 10px 0;
`;

const HorizontalLineShipping = styled(HorizontalLine)`
	margin: 3rem 0;
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
	justify-content: space-between;
	align-items: center;

	@media ${devices.tablet} {
		flex-direction: column;
		min-height: 120px;
	}
`;

const UserInfoWrapperShipping = styled(UserInfoWrapper)`
	width: 80%;
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
