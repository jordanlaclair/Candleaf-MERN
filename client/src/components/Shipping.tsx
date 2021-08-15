import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ReactComponent as Logo } from "../images/leaf.svg";
import { PurchaseOption } from "./ProductDetails";
import Radio from "@material-ui/core/Radio";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Product from "./Product";
import LoyaltyIcon from "@material-ui/icons/Loyalty";

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
import { Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {
	updateEmail,
	updateShippingCost,
} from "../store/actions/usersActionCreator";
import { ShippingMethod } from "../store/actions/usersActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/reducers";

const Shipping = () => {
	const [shippingMethod, setShippingMethod] = useState("");
	const history = useHistory();
	const couponDiscount = useSelector(
		(state: State) => state.user.couponDiscount
	);
	const newsLetterDiscount = useSelector(
		(state: State) => state.user.newsLetterDiscount
	);
	const totalDiscounts = useSelector(
		(state: State) => state.user.totalDiscounts
	);
	const shippingCost = useSelector((state: State) => state.user.shippingCost);
	const [couponCode, setCouponCode] = useState("");
	const userID = useSelector((state: State) => state.user._id);
	const total = useSelector((state: State) => state.user.total);
	const email = useSelector((state: State) => state.user.email);
	const address = useSelector((state: State) => state.user.address);
	const cartTotal = useSelector((state: State) => state.user.cartTotal);
	const candles = useSelector((state: State) => state.candles);
	const cart = useSelector((state: State) => state.user.cart);
	const postalCode = useSelector((state: State) => state.user.postalCode);
	const city = useSelector((state: State) => state.user.city);
	const region = useSelector((state: State) => state.user.region);
	const dispatch = useDispatch();

	const useStyles = makeStyles((theme) => ({
		button: {
			backgroundColor: "#49A010",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));
	const classes = useStyles();
	const handleBackTotDetails = () => {
		history.push("/checkout");
	};
	const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShippingMethod(event.target.value);
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

	const handleGetImageSrc = (id: string) => {
		let result: string = "";
		candles.forEach((candle) => {
			if (candle._id == id) {
				result = candle.image;
			}
		});

		return result;
	};

	useEffect(() => {
		if (shippingMethod !== "")
			dispatch(updateShippingCost(shippingMethod, userID));
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
						<PastBreadCrumb>Cart</PastBreadCrumb>
						<NavigateNextIcon />
						<PastBreadCrumb>Details</PastBreadCrumb>
						<NavigateNextIcon />
						<CurrentBreadCrumb>Shipping</CurrentBreadCrumb>
						<NavigateNextIcon />
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
				<h2>Shipping Method</h2>
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
					<h3>$4.99</h3>
				</OptionWrapper>
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
					<h3>$7.99</h3>
				</OptionWrapper>
				<ButtonWrapper>
					<Button
						variant="contained"
						className={classes.button}
						startIcon={<FormatListBulletedIcon />}
						onClick={handleBackTotDetails}
					>
						<h3>Back to Details</h3>
					</Button>

					<Button
						variant="contained"
						className={classes.button}
						startIcon={<MonetizationOnIcon />}
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
				<CouponWrapper>
					<InputField
						placeholder="Coupon Code"
						type="text"
						value={couponCode}
					/>
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
						<ShippingTextBright>
							{shippingCost === 0
								? "Please select shipping"
								: `$${Math.round(shippingCost * 100 + Number.EPSILON) / 100}`}
						</ShippingTextBright>
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
		</ShippingWrapper>
	);
};

export default Shipping;

const ShippingWrapper = styled(CheckoutWrapper)``;

const InputFieldShipping = styled(InputField)``;

const InputFieldWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin: 10px 0;
`;

const HorizontalLineShipping = styled(HorizontalLine)`
	margin: 3rem 0;
`;

const OptionWrapper = styled.div`
	padding: 3px 12px;
	display: flex;
	min-width: 350px;
	justify-content: space-between;
	align-items: center;
	background: transparent;
	border-radius: 7px;
	margin-top: 1rem;
	border: 1px solid ${(props) => props.theme.colors.opposite};
	> h3 {
		font-weight: bold;
		color: ${(props) => props.theme.brand};
	}
`;
const ButtonWrapper = styled.div`
	display: flex;
	width: 80%;
	margin-top: 2rem;
	justify-content: space-between;
	align-items: center;
`;

const ShippingTextBright = styled(ShippingText)`
	opacity: 1;
`;
