import React, { FC, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ReactComponent as Logo } from "../assets/images/leaf.svg";

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
import UserLottie from "../assets/lotties/userProfile.json";
import { useSelector } from "react-redux";
import { State } from "../store/reducers";
import styled from "styled-components";
import UserInfoField from "./UserInfoField";
import Lottie from "react-lottie";
import { useState } from "react";
const Payment: FC = () => {
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
	const cartTotal = useSelector((state: State) => state.user.cartTotal);
	const [userIconIsStopped, setUserIconIsStopped] = useState(false);
	const [userIconIsPaused, setUserIconIsPaused] = useState(false);
	const userIconRef = useRef(null);
	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: UserLottie,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
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

	useEffect(() => {
		console.log(userIconIsStopped);
	}, [userIconIsStopped]);

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

				<UserInfoWrapper
					onMouseOver={() => {
						setUserIconIsStopped(true);
						setTimeout(() => {
							setUserIconIsStopped(false);
						}, 350);
					}}
				>
					<UserInfoHeader>
						<LottieWrapper>
							<Lottie
								options={defaultOptions}
								isClickToPauseDisabled={true}
								isStopped={userIconIsStopped}
							/>
						</LottieWrapper>
						<h2>Customer Information</h2>
					</UserInfoHeader>
					<UserInfoField fieldName={"Contact"} fieldData={userEmail} />
					<HorizontalLineUserInfo />
					<UserInfoField fieldName={"Ship To"} fieldData={userEmail} />
					<HorizontalLineUserInfo />
					<UserInfoField
						fieldName={"Method"}
						shipping
						fieldData={shippingMethod}
					/>
				</UserInfoWrapper>
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
								: roundToNearestTenths(shippingCost)}
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

const UserInfoWrapper = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 25px;
	border: 1px solid ${(props) => props.theme.lightBrand};
	border-radius: 8px;
`;
const UserInfoHeader = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	align-self: flex-start;
`;

const LottieWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 70px;
	margin-right: 20px;
`;
