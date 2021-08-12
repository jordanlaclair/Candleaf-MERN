import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../images/leaf.svg";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Button, makeStyles, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import {
	CountryDropdown,
	RegionDropdown,
	CountryRegionData,
} from "react-country-region-selector";

import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { OutlinedInput } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import devices from "../styles/devices";
import { useAuth0 } from "@auth0/auth0-react";
import { State } from "../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import {
	addNewsLetterDiscount,
	removeNewsLetterDiscount,
	addCouponDiscount,
	updateTotalDiscounts,
} from "../store/actions/usersActionCreator";
const Checkout = () => {
	const { user, isAuthenticated } = useAuth0();

	interface UserData {
		firstName: string;
		lastName: string;
		address: string;
		shippingNote?: string;
		city: string;
		postalCode: string;
		email: string;
		country: string;
		region: string;
	}

	const initialUserState = {
		firstName: user?.name!.split(" ")[0] || "",
		lastName: user?.name!.split(" ").slice(-1)[0] || "",
		address: user?.address! || "",
		shippingNote: "",
		city: "",
		postalCode: "",
		country: "",
		region: "",
		email: user?.email || "",
	};

	const dispatch = useDispatch();
	const [checkNewsLetter, setCheckNewsLetter] = useState(() => {
		let saved = localStorage.getItem("newsLetterChecked");
		let initialValue;
		if (saved != null) {
			initialValue = JSON.parse(saved);
		}
		return initialValue || false;
	});
	const [country, setCountry] = useState("");
	const [couponCode, setCouponCode] = useState("");
	const [validCouponCode, setValidCouponCode] = useState(false);

	const [userData, setUserData] = useState<UserData>(initialUserState);
	const cart = useSelector((state: State) => state.user.cart);
	const userID = useSelector((state: State) => state.user._id);
	const cartTotal = useSelector((state: State) => state.user.cartTotal);
	const candles = useSelector((state: State) => state.candles);
	const totalDiscounts = useSelector(
		(state: State) => state.user.totalDiscounts
	);
	const couponDiscount = useSelector(
		(state: State) => state.user.couponDiscount
	);
	const total = useSelector((state: State) => state.user.total);
	const newsLetterDiscount = useSelector(
		(state: State) => state.user.newsLetterDiscount
	);
	const [region, setRegion] = useState("");
	const history = useHistory();
	const useStyles = makeStyles((theme) => ({
		button: {
			backgroundColor: "#49A010",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));
	const classes = useStyles();
	const handleCoupon = () => {
		if (couponCode.length > 1) {
			setCouponCode("");
			setValidCouponCode(true);
		} else {
			setValidCouponCode(false);
		}
	};

	useEffect(() => {
		if (newsLetterDiscount !== 0 || couponDiscount !== 0) {
			dispatch(updateTotalDiscounts(userID));
		}
	}, [newsLetterDiscount, couponDiscount]);

	useEffect(() => {
		localStorage.setItem("newsLetterChecked", JSON.stringify(checkNewsLetter));

		let discount = Math.round((cartTotal * 0.1 + Number.EPSILON) * 100) / 100;
		if (checkNewsLetter && newsLetterDiscount === 0) {
			dispatch(addNewsLetterDiscount(discount, userID));
		} else if (checkNewsLetter == false && newsLetterDiscount > 0) {
			dispatch(removeNewsLetterDiscount(discount, userID));
		}
	}, [checkNewsLetter]);

	useEffect(() => {
		console.log(cart);
	}, [cart]);

	useEffect(() => {
		if (validCouponCode && couponDiscount === 0) {
			let discount =
				Math.round((cartTotal * 0.05 + Number.EPSILON) * 100) / 100;
			dispatch(addCouponDiscount(discount, userID));
		}
	}, [validCouponCode]);

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
		setCountry(value);
	};

	const handleRegionChange = (value: any) => {
		setRegion(value);
	};

	const dropDownStyle = {
		padding: "15px",
		fontFamily: "Poppins, sans-serif",
		border: `2.5px solid #49a010`,
		outline: "none",
		minWidth: "207.5px",
		maxWidth: "207.5px",
		fontWeight: "bold",
		color: "gray",
	};

	const countryProps = {
		// make sure all required component's inputs/Props keys&types match
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
		// make sure all required component's inputs/Props keys&types match
		value: region,
		country: country,
		name: "rcrs-region",
		id: "",
		classes: "",
		required: true,
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
		disabled: false,
	};

	const handleBackToCart = () => {
		history.push("/cart");
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		history.push("/shipping");
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
						<PastBreadCrumb>Cart</PastBreadCrumb>
						<NavigateNextIcon />
						<CurrentBreadCrumb>Details</CurrentBreadCrumb>
						<NavigateNextIcon />
						<NextBreadCrumb>Shipping</NextBreadCrumb>
						<NavigateNextIcon />
						<NextBreadCrumb>Payment</NextBreadCrumb>
					</BreadCrumbs>
				</HeaderWrapper>
				<FormWrapper
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<InputHeader>Contact</InputHeader>
					<InputField
						placeholder="Email"
						type="email"
						value={userData.email}
						onChange={(e) => {
							setUserData((prevState) => {
								return { ...prevState, email: e.target.value };
							});
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
						value={userData.firstName}
						onChange={(e) => {
							setUserData((prevState) => {
								return { ...prevState, firstName: e.target.value };
							});
						}}
						required
					/>
					<InputField
						fieldType="name"
						placeholder="Last Name"
						required
						type="text"
						value={userData.lastName}
						onChange={(e) => {
							setUserData((prevState) => {
								return { ...prevState, lastName: e.target.value };
							});
						}}
					/>
					<InputField
						placeholder="Address"
						type="text"
						required
						value={userData.address}
						onChange={(e) => {
							setUserData((prevState) => {
								return { ...prevState, address: e.target.value };
							});
						}}
					/>
					<InputField
						placeholder="Shipping note (optional)"
						type="text"
						value={userData.shippingNote}
						onChange={(e) => {
							setUserData((prevState) => {
								return { ...prevState, shippingNote: e.target.value };
							});
						}}
					/>
					<InputField
						placeholder="City"
						type="text"
						required
						value={userData.city}
						onChange={(e) => {
							setUserData((prevState) => {
								return { ...prevState, city: e.target.value };
							});
						}}
					/>
					<InputField
						placeholder="Postal Code"
						type="text"
						required
						value={userData.postalCode}
						onChange={(e) => {
							setUserData((prevState) => {
								return { ...prevState, postalCode: e.target.value };
							});
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
							<h3>Continue to Shipping</h3>
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
					<InputField
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
						<h3>${Math.round((cartTotal + Number.EPSILON) * 100) / 100}</h3>
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
						<Shipping>Calculated at the next step</Shipping>
					</DetailsWrapper>
				</DetailsOuterWrapper>
				<HorizontalLine />
				<TotalWrapper>
					<h3>Total</h3>

					{totalDiscounts === 0 ? (
						<h3>None</h3>
					) : (
						<h2>{`$${Math.round((total + Number.EPSILON) * 100) / 100}`}</h2>
					)}
				</TotalWrapper>
			</SecondHalf>
		</CheckoutWrapper>
	);
};

export default Checkout;

export const CheckoutWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
`;

export const FirstHalf = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
	padding: 0px 3.5rem;
`;

export const SecondHalf = styled.div`
	background: ${(props) => props.theme.colors.secondary};
	height: 100vh;
	display: flex;
	padding: 3rem 5rem;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	flex: 2;
`;
export const HeaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-top: 30px;
	margin-left: -100px;
	margin-bottom: 50px;
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
`;

export const PastBreadCrumb = styled.h3`
	opacity: 0.7;
`;
export const CurrentBreadCrumb = styled.h3`
	color: ${(props) => props.theme.brand};
`;
export const LocationWrapper = styled.div`
	min-width: 380px;
`;

export const NextBreadCrumb = styled.h3``;

const FormWrapper = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

const NewsLetterWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	> h4 {
		white-space: nowrap;
	}
`;

const InputHeader = styled.h2``;

export const InputField = styled.input<{ fieldType?: string }>`
	padding: 15px;
	outline: none;
	min-width: ${(props) => (props.fieldType == "name" ? "200px" : "380px")};
	border: 2.5px solid ${(props) => props.theme.brand};
	font-family: "Poppins", sans-serif;
	font-weight: bold;
`;

const ShippingWrapper = styled.div`
	margin-top: 15px;
	min-width: 415px;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ProductsWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	grid-gap: 2rem;
`;

export const HorizontalLine = styled.hr`
	width: 100%;
`;
const CouponWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	> input {
		margin-right: 10px;
	}
`;
const DetailsOuterWrapper = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const DetailsWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const TotalWrapper = styled(DetailsWrapper)`
	width: 80%;
`;

const Shipping = styled.h3`
	opacity: 0.8;
`;
