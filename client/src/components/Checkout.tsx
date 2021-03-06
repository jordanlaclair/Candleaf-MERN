import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/images/leaf.svg";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { v4 as uuidv4 } from "uuid";
import { Button, makeStyles, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { useHistory, withRouter } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import devices from "../styles/devices";
import { useAuth0 } from "@auth0/auth0-react";
import { State } from "../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import * as userAction from "../store/actions/usersActionCreator";
import { UserSubmitDetailsObject } from "../store/actions";
import { FC } from "react";

const Checkout: FC = () => {
	const { user, isAuthenticated } = useAuth0();
	const postalCodeRef = useRef(0);
	const dispatch = useDispatch();
	const [checkNewsLetter, setCheckNewsLetter] = useState(false);
	const [couponCode, setCouponCode] = useState("");
	const [shippingNote, setShippingNote] = useState("");
	const cart = useSelector((state: State) => state.user.cart);
	const city = useSelector((state: State) => state.user.city);
	const address = useSelector((state: State) => state.user.address);
	const email = useSelector((state: State) => state.user.email);
	const postalCode = useSelector((state: State) => state.user.postalCode);
	const [couponCount, setCouponCount] = useState(0);
	const lastName = useSelector((state: State) => state.user.lastName);
	const firstName = useSelector((state: State) => state.user.firstName);
	const country = useSelector((state: State) => state.user.country);
	const region = useSelector((state: State) => state.user.region);
	const reduxUser = useSelector((state: State) => state.user);
	const userID = useSelector((state: State) => state.user._id);
	const cartTotal = useSelector((state: State) => state.user.cartTotal);
	const candles = useSelector((state: State) => state.candles);

	const couponDiscount = useSelector(
		(state: State) => state.user.couponDiscount
	);
	const newsLetterDiscount = useSelector(
		(state: State) => state.user.newsLetterDiscount
	);
	const history = useHistory();
	const useStyles = makeStyles((theme) => ({
		button: {
			backgroundColor: "#54AD1A",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));

	const classes = useStyles();
	const handleCoupon = () => {
		setCouponCount((prevState) => {
			return prevState + 1;
		});
	};

	useEffect(() => {
		if (couponCount === 1) {
			let discount =
				Math.round((cartTotal * 0.05 + Number.EPSILON) * 100) / 100;
			if (isAuthenticated) {
				dispatch(userAction.addCouponDiscount(discount, user?.sub!, "auth"));
			} else {
				dispatch(userAction.addCouponDiscount(discount, userID, "guest"));
			}
		}
	}, [couponCount]);
	useEffect(() => {
		let postalCode = document?.getElementById("postalCode") as HTMLInputElement;
		if (postalCode.value === "0") postalCode.value = "";

		if (couponDiscount > 0) {
			if (isAuthenticated) {
				dispatch(userAction.removeCouponDiscount(user?.sub!, "auth"));
			} else {
				dispatch(userAction.removeCouponDiscount(userID, "guest"));
			}
		}
		return () => {};
	}, []);

	/* useEffect(() => {
		dispatch(userAction.updateTotalDiscounts(userID));
	}, [newsLetterDiscount, couponDiscount]);
 */
	useEffect(() => {
		let discount = Math.round((cartTotal * 0.1 + Number.EPSILON) * 100) / 100;
		if (checkNewsLetter) {
			if (isAuthenticated) {
				dispatch(
					userAction.addNewsLetterDiscount(discount, user?.sub!, "auth")
				);
			} else {
				dispatch(userAction.addNewsLetterDiscount(discount, userID, "guest"));
			}
		} else if (!checkNewsLetter && newsLetterDiscount > 0) {
			if (isAuthenticated) {
				dispatch(
					userAction.removeNewsLetterDiscount(discount, user?.sub!, "auth")
				);
			} else {
				dispatch(
					userAction.removeNewsLetterDiscount(discount, userID, "guest")
				);
			}
		}
	}, [checkNewsLetter]);

	const handleNewsLetter = () => {
		setCheckNewsLetter(!checkNewsLetter);
	};

	const GreenCheckbox = withStyles({
		root: {
			color: green[500],
			"&$checked": {
				color: green[600],
			},
		},
		checked: {},
	})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

	const handleCountryChange = (value: any) => {
		dispatch(userAction.updateCountry(value));
	};

	const handleRegionChange = (value: any) => {
		dispatch(userAction.updateRegion(value));
	};

	const dropDownStyle = {
		padding: "15px",
		fontFamily: "Poppins, sans-serif",
		border: `2.5px solid #49a010`,
		outline: "none",
		minWidth: "50%",
		fontWeight: "bold",
		color: "gray",
	};

	const countryProps = {
		value: country,
		name: "rcrs-country",
		id: "",
		classes: "",
		showDefaultOption: true,
		required: true,
		priorityOptions: [],
		defaultOptionLabel: "Select Country",
		labelType: undefined,
		valueType: undefined,
		whitelist: [],
		onChange: (value: any) => {
			handleCountryChange(value);
		},
		onBlur: () => {},
		style: dropDownStyle,
		blacklist: [],
		disabled: false,
	};

	const regionProps = {
		value: region,
		name: "rcrs-region",
		id: "",
		classes: "",
		required: true,
		country: country,
		showDefaultOption: undefined,
		priorityOptions: [],
		defaultOptionLabel: "Select Region",
		labelType: undefined,
		valueType: undefined,
		whitelist: [],
		onChange: (value: any) => {
			handleRegionChange(value);
		},
		onBlur: () => {},
		style: dropDownStyle,
		blacklist: [],
		disableWhenEmpty: true,
	};

	const handleBackToCart = () => {
		history.push("/cart");
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let userDetails: UserSubmitDetailsObject = {
			userEmail: reduxUser.email,
			userFirstName: reduxUser.firstName,
			userLastName: reduxUser.lastName,
			userPostalCode: reduxUser.postalCode,
			userCountry: reduxUser.country,
			userRegion: reduxUser.region,
			userAddress: reduxUser.address,
			userCity: reduxUser.city,
		};

		if (isAuthenticated) {
			dispatch(userAction.userSubmitDetails(user?.sub!, userDetails, "auth"));
		} else {
			dispatch(userAction.userSubmitDetails(userID, userDetails, "guest"));
		}

		history.push("/checkout/shipping");
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

	const roundToNearestTenths = (value: number) => {
		return `$${Math.round((value + Number.EPSILON) * 100) / 100}`;
	};

	return (
		<CheckoutWrapper>
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
							<CurrentBreadCrumb>Details</CurrentBreadCrumb>

							<NavigateNextIcon />
						</CrumbWrapper>
						<CrumbWrapper>
							<NextBreadCrumb>Shipping</NextBreadCrumb>
							<NavigateNextIcon />
						</CrumbWrapper>
						<NextBreadCrumb>Payment</NextBreadCrumb>
					</BreadCrumbs>
				</HeaderWrapper>
				<FormWrapper
					onSubmit={(e) => {
						handleSubmit(e);
					}}
					autoComplete="off"
				>
					<InputHeader>Contact</InputHeader>
					<InputField
						placeholder="Email"
						type="email"
						defaultValue={user?.email}
						value={email}
						onChange={(e) => {
							dispatch(userAction.updateEmail(e.target.value));
						}}
						required
					/>
					<NewsLetterWrapper>
						<GreenCheckbox
							checked={checkNewsLetter}
							onChange={handleNewsLetter}
							name="checkedNewsLetter"
						/>
						<h4>Add me to Candleaf newsletter for a 10% discount</h4>
					</NewsLetterWrapper>

					<InputHeader>Contact</InputHeader>
					<InputField
						fieldType="name"
						name="First Name"
						placeholder="First Name"
						type="text"
						value={firstName}
						onChange={(e) => {
							dispatch(userAction.updateFirstName(e.target.value));
						}}
						required
					/>
					<InputField
						fieldType="name"
						placeholder="Last Name"
						required
						type="text"
						value={lastName}
						onChange={(e) => {
							dispatch(userAction.updateLastName(e.target.value));
						}}
					/>
					<InputField
						placeholder="Address"
						type="text"
						required
						value={address}
						onChange={(e) => {
							dispatch(userAction.updateAddress(e.target.value));
						}}
					/>

					<InputField
						placeholder="Shipping note (optional)"
						type="text"
						value={shippingNote}
						onChange={(e) => {
							setShippingNote(e.target.value);
						}}
					/>
					<InputField
						placeholder="City"
						type="text"
						required
						value={city}
						onChange={(e) => {
							dispatch(userAction.updateCity(e.target.value));
						}}
					/>
					<InputField
						placeholder="Postal Code"
						type="number"
						id="postalCode"
						required
						value={postalCode}
						onChange={(e) => {
							dispatch(userAction.updatePostalCode(parseInt(e.target.value)));
						}}
					/>
					<LocationWrapper>
						<CountryDropdown {...countryProps} />
						<RegionDropdown {...regionProps} />
					</LocationWrapper>

					<ShippingWrapper>
						<Button
							variant="contained"
							className={classes.button}
							startIcon={<ShoppingCartIcon />}
							onClick={handleBackToCart}
						>
							<h3>Back To Cart</h3>
						</Button>
						<Button
							variant="contained"
							className={classes.button}
							startIcon={<AirplanemodeActiveIcon />}
							type="submit"
						>
							<h3>Shipping</h3>
						</Button>
					</ShippingWrapper>
				</FormWrapper>
			</FirstHalf>
			<SecondHalf>
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
				<CouponWrapper>
					<InputFieldCoupon
						placeholder="Coupon Code"
						type="text"
						value={couponCode}
						onChange={(e) => {
							setCouponCode(e.target.value);
						}}
					/>
					<Button
						variant="contained"
						className={classes.button}
						startIcon={<LoyaltyIcon />}
						onClick={handleCoupon}
					>
						<h3>Add Code</h3>
					</Button>
				</CouponWrapper>
				<HorizontalLine />
				<DetailsOuterWrapper>
					<DetailsWrapper>
						<h3>Subtotal</h3>
						<h3>{roundToNearestTenths(cartTotal)}</h3>
					</DetailsWrapper>
					<DetailsWrapper>
						<h3>Coupon Code</h3>
						<h3>{couponDiscount > 0 ? `-$${couponDiscount}` : "None"}</h3>
					</DetailsWrapper>
					<DetailsWrapper>
						<h3>Discount</h3>
						<h3>
							{newsLetterDiscount === 0 || !checkNewsLetter
								? "None"
								: `-$${newsLetterDiscount}`}
						</h3>
					</DetailsWrapper>
					<DetailsWrapper>
						<h3>Shipping</h3>
						<ShippingText>-</ShippingText>
					</DetailsWrapper>
				</DetailsOuterWrapper>
				<HorizontalLine />
				<TotalWrapper>
					<h3>Total</h3>
					<h3>Calculated at the next step</h3>
				</TotalWrapper>
			</SecondHalf>
		</CheckoutWrapper>
	);
};

export default withRouter(Checkout);

export const CheckoutWrapper = styled.div`
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

export const FirstHalf = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
	overflow: hidden;
	justify-content: flex-start;
	align-items: center;
	@media ${devices.laptopM} {
		height: unset;

		padding: 0;
		padding-top: 2rem;
		flex: 1;
		width: 85%;
	}
`;

export const SecondHalf = styled.div`
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
`;
export const HeaderWrapper = styled.div`
	width: 80%;
	margin-top: 15px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;
export const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const LogoWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.brand};
`;

export const ImageWrapper = styled.div`
	width: 40px;
	> svg {
		max-width: 100%;
		height: auto;
	}
`;
export const BreadCrumbs = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	@media ${devices.mobileXS} {
		flex-direction: column;
		align-items: flex-start;
		margin-top: 10px;
	}
`;

export const PastBreadCrumb = styled.h3`
	opacity: 0.7;
`;
export const CurrentBreadCrumb = styled.h3`
	color: ${(props) => props.theme.brand};
`;
export const LocationWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 80%;
`;

export const NextBreadCrumb = styled.h3``;

const FormWrapper = styled.form`
	overflow: hidden;
	margin-top: 3rem;
	width: 80%;
	padding-bottom: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

const NewsLetterWrapper = styled.div`
	display: flex;
	justify-content: center;
	text-align: start;
	align-items: center;
	padding: 20px 0;
	> h4 {
		text-align: start;
	}

	@media ${devices.laptopM} {
		font-size: 12px;
	}
`;

const InputHeader = styled.h2``;

export const InputField = styled.input<{
	fieldType?: string;
	id?: string;
}>`
	padding: 15px;
	overflow: hidden;
	outline: none;
	width: 80%;
	border: 2.5px solid ${(props) => props.theme.brand};
	font-family: "Poppins", sans-serif;
	font-weight: bold;
`;

const ShippingWrapper = styled.div`
	margin-top: 2rem;
	width: 90%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media ${devices.mobileXL} {
		flex-direction: column;
		height: 100px;
	}
	@media ${devices.mobileXL} {
		height: 100px;
	}
`;

export const ProductsWrapper = styled.div`
	padding: 20px;
	width: 90%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	grid-gap: 2rem;
	justify-items: center;
	@media ${devices.laptopM} {
		width: 90%;
	}
`;

export const HorizontalLine = styled.hr`
	width: 90%;
	margin: 2rem 0;
`;
export const CouponWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	> input {
		margin-right: 10px;
	}
	@media ${devices.mobileXL} {
		flex-direction: column;
		justify-content: space-between;
		min-height: 120px;
	}
`;
export const DetailsOuterWrapper = styled.div`
	width: 80%;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;

	@media ${devices.mobileXL} {
		font-size: 14px;
	}

	@media ${devices.mobileS} {
		font-size: 13px;
	}
`;

export const DetailsWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const TotalWrapper = styled(DetailsWrapper)`
	width: 80%;
	flex: 1;
	@media ${devices.laptopM} {
		flex-direction: column;
		text-align: start;
		align-items: flex-start;
	}
	@media ${devices.mobileXL} {
		font-size: 14px;
	}
	@media ${devices.mobileS} {
		font-size: 13px;
	}
`;

export const ShippingText = styled.h3``;
const InputFieldCoupon = styled(InputField)`
	min-width: unset;
	width: 50%;
`;
export const CrumbWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
