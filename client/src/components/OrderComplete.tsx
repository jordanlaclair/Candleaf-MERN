import React, { FC, useEffect, useRef } from "react";
import { useHistory, withRouter } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ReactComponent as Logo } from "../assets/images/leaf.svg";
import PaymentIcon from "@material-ui/icons/Payment";
import {
	HeaderWrapper,
	CheckoutWrapper,
	FirstHalf,
	Header,
	LogoWrapper,
	ImageWrapper,
	CrumbWrapper,
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
import { ButtonWrapper } from "./Shipping";
import CheckMarkLottie from "../assets/lotties/checkmark.json";
import { useSelector } from "react-redux";
import { State } from "../store/reducers";
import styled from "styled-components";
import Spinner from "react-spinkit";
import Lottie from "react-lottie";
import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import devices from "../styles/devices";
import { fetchUser } from "../apis/users";
import { SpinnerWrapper } from "../App";
const OrderComplete: FC = () => {
	const history = useHistory();
	const userID = useSelector((state: State) => state.user._id);
	const firstName = useSelector((state: State) => state.user.firstName);
	const [newOrderNumber, setNewOrderNumber] = useState(0);
	const candles = useSelector((state: State) => state.candles);

	const shippingMethod = useSelector(
		(state: State) => state.user.shippingMethod
	);

	const [checkMarkIsStopped, setCheckMarkIsStopped] = useState(false);

	const fetchOrderNumber = async () => {
		setTimeout(async () => {
			const { data } = await fetchUser(userID);
			let { orders } = data;

			const { orderNumber } = orders.slice(-1)[0];
			setNewOrderNumber(orderNumber);
		}, 2000);
	};
	useEffect(() => {
		fetchOrderNumber();
	}, []);

	const checkMarkLottieOptions = {
		loop: false,
		autoplay: true,
		animationData: CheckMarkLottie,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const useStyles = makeStyles(() => ({
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

	const handleBackToHome = () => {
		history.push("/");
	};

	if (newOrderNumber == 0) {
		return (
			<SpinnerWrapper>
				<Spinner color="green" name="ball-grid-beat" fadeIn="none" />
			</SpinnerWrapper>
		);
	}

	return (
		<PaymentWrapper>
			<OrderCompleteFirstHalf>
				<HeaderWrapperShipping>
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
				</HeaderWrapperShipping>

				<LottieWrapper>
					<Lottie
						options={checkMarkLottieOptions}
						isStopped={checkMarkIsStopped}
						isClickToPauseDisabled={true}
					/>
				</LottieWrapper>
				<h1>Payment Confirmed!</h1>
				<h4>Order # {newOrderNumber}</h4>
				<h5>{`Thank you, ${firstName}, for purchasing from Candleaf. The earth is grateful of your descision to buy our eco-friendly candles. Now that your order has been confirmed, please wait unti you receive an email notifying you that your order has been shipped.`}</h5>
				<PaymentButtonWrapper>
					<Button
						variant="contained"
						className={classes.button}
						startIcon={<HomeIcon />}
						onClick={handleBackToHome}
					>
						<h3>Back to Shopping</h3>
					</Button>
				</PaymentButtonWrapper>
			</OrderCompleteFirstHalf>
		</PaymentWrapper>
	);
};

export default withRouter(OrderComplete);

const PaymentWrapper = styled(CheckoutWrapper)`
	@media ${devices.tablet} {
		font-size: 13px;
		padding-left: 0px;
		padding-right: 0px;
	}
`;

const HorizontalLineUserInfo = styled(HorizontalLine)`
	border-color: ${(props) => props.theme.brand};
	width: 100%;
	margin: 15px 0;
`;

const LottieWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 250px;
	margin-right: 20px;
`;

const OrderCompleteFirstHalf = styled(FirstHalf)`
	flex: 2;
	justify-content: space-evenly;
	padding: 30px 50px;

	> h5 {
		margin-top: 15px;
		width: 70%;
	}
	@media ${devices.tablet} {
		padding-left: 0px;
		padding-right: 0px;
	}
`;

const PaymentButtonWrapper = styled(ButtonWrapper)`
	justify-content: center;
`;
const HeaderWrapperShipping = styled(HeaderWrapper)`
	align-self: flex-start;
	margin: 0px;
	margin-bottom: 3rem;
`;
