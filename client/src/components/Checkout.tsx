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
import devices from "../styles/devices";

const Checkout = () => {
	const [checkNewsLetter, setCheckNewsLetter] = useState(false);
	const [country, setCountry] = useState("");
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
					<InputField placeholder="Name" type="text" />
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

			<SecondHalf>f</SecondHalf>
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
	align-items: flex-start;
	flex: 1;
	padding: 0px 3.5rem;
`;
const SecondHalf = styled.div`
	background: ${(props) => props.theme.colors.secondary};
	height: 100vh;
	display: flex;
	padding-right: 10rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 2;
`;
const HeaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	align-self: flex-start;
	margin-top: 30px;

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

const InputField = styled.input`
	padding: 15px;
	outline: none;
	min-width: 380px;
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
