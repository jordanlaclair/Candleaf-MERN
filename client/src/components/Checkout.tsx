import React, { useState } from "react";
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
import { State } from "../store/reducers";
import { useSelector } from "react-redux";
import Product from "./Product";

const Checkout = () => {
	const [checkNewsLetter, setCheckNewsLetter] = useState(false);
	const [country, setCountry] = useState("");
	const cart = useSelector((state: State) => state.user.cart);
	const cartTotal = useSelector((state: State) => state.user.cartTotal);
	const candles = useSelector((state: State) => state.candles);

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

	const handleShipping = () => {
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
				<FormWrapper>
					<InputHeader>Contact</InputHeader>
					<InputField placeholder="Email" type="email" />
					<NewsLetterWrapper>
						<GreenCheckbox
							checked={checkNewsLetter}
							onChange={handleNewsLetter}
							name="checkedNewsLetter"
						/>
						<h4>Add me to Candleaf newsletter for a 10% discount</h4>
					</NewsLetterWrapper>

					<InputHeader>Contact</InputHeader>
					<InputField fieldType="name" placeholder="First Name" type="text" />
					<InputField fieldType="name" placeholder="Last Name" type="text" />
					<InputField placeholder="Address" type="text" />
					<InputField placeholder="Shipping note (optional)" type="text" />
					<InputField placeholder="City" type="text" />
					<InputField placeholder="Postal Code" type="text" />
					<LocationWrapper>
						<CountryDropdown {...countryProps} />
						<RegionDropdown {...regionProps} />
					</LocationWrapper>
				</FormWrapper>
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
						onClick={handleShipping}
					>
						<h3>Continue</h3>
					</Button>
				</ShippingWrapper>
			</FirstHalf>

			<SecondHalf>
				<ProductsWrapper>
					{cart.map((product) => {
						let result = handleGetImageSrc(product.productId);
						return (
							<CartProduct
								title={product.productName}
								price={product.price}
								image={result}
								productId={product.productId}
								productQuantity={product.productQuantity}
								showQuantity={true}
							/>
						);
					})}
				</ProductsWrapper>
				<HorizontalLine />
				<CouponWrapper>
					<InputField placeholder="Coupon Code" type="text" />
					<Button
						variant="contained"
						className={classes.button}
						startIcon={<LoyaltyIcon />}
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
						<h3>Shipping</h3>
						<Shipping>Calculated at the next step</Shipping>
					</DetailsWrapper>
				</DetailsOuterWrapper>
				<HorizontalLine />
				<TotalWrapper>
					<h3>Total</h3>
					<h2>$</h2>
				</TotalWrapper>
			</SecondHalf>
		</CheckoutWrapper>
	);
};

export default Checkout;

const CheckoutWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
`;

const FirstHalf = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
	padding: 0px 3.5rem;
`;

const CartProduct = styled(Product)`
	background: red !important;
	color: green;
`;
const SecondHalf = styled.div`
	background: ${(props) => props.theme.colors.secondary};
	height: 100vh;
	display: flex;
	padding: 3rem 5rem;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	flex: 2;
`;
const HeaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-top: 30px;
	margin-left: -100px;
	margin-bottom: 50px;
`;
const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LogoWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.brand};
`;

const ImageWrapper = styled.div`
	width: 40px;
	> svg {
		max-width: 100%;
		height: auto;
	}
`;
const BreadCrumbs = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PastBreadCrumb = styled.h3`
	opacity: 0.7;
`;
const CurrentBreadCrumb = styled.h3`
	color: ${(props) => props.theme.brand};
`;
const LocationWrapper = styled.div`
	min-width: 380px;
`;

const NextBreadCrumb = styled.h3``;

const FormWrapper = styled.div`
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

const InputField = styled.input<{ fieldType?: string }>`
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

const HorizontalLine = styled.hr`
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
