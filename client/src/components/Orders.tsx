import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../store/reducers";
import devices from "../styles/devices";
import { CheckoutWrapper } from "./Cart";
import { HorizontalLine } from "./Checkout";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import HomeIcon from "@material-ui/icons/Home";
import Product from "./Product";
import { useHistory } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";

const Orders = () => {
	const history = useHistory();
	const orders = useSelector((state: State) => state.user.orders);
	const candles = useSelector((state: State) => state.candles);
	const useStyles = makeStyles((theme) => ({
		button: {
			marginTop: "15px",
			backgroundColor: "#54AD1A",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));

	const classes = useStyles();

	const handleGetImageSrc = (id: string) => {
		let result: string = "";
		candles.forEach((candle) => {
			if (candle._id === id) {
				result = candle.image;
			}
		});

		return result;
	};

	const returnHome = () => {
		const navLink = document.querySelectorAll(".nav__link");
		navLink.forEach((n) => n.classList.remove("active"));
		history.push("/");
	};

	if (orders.length === 0) {
		return (
			<NoOrdersWrapper>
				<h1>Oh no! You haven't ordered yet!</h1>
				<Button
					variant="contained"
					className={classes.button}
					startIcon={<HomeIcon />}
					onClick={returnHome}
				>
					<h4>Browse the Collection</h4>
				</Button>
			</NoOrdersWrapper>
		);
	}

	return (
		<OrdersWrapper>
			<OrdersHeading>
				<h1>Orders</h1>
			</OrdersHeading>

			<OrdersInnerWrapper>
				{orders.map((order) => {
					return (
						<OuterOrderGridWrapper>
							<OrdersGridWrapper>
								{order.data.map((product) => {
									let imageSrc = handleGetImageSrc(product.productId);
									return (
										<Product
											price={product.price}
											productId={product.productId}
											showQuantity={true}
											title={product.productName}
											productQuantity={product.productQuantity}
											showAddToCart={false}
											image={imageSrc}
										/>
									);
								})}
							</OrdersGridWrapper>
							<OrderDetailsWrapper>
								<ShippingDetailsWrapper>
									<ShippingText>{order.shippingMethod}</ShippingText>
									<IconWrapper>
										<LocalShippingIcon />
									</IconWrapper>
								</ShippingDetailsWrapper>
								<OrderTotal>Order Total ${order.total}</OrderTotal>
								<OrderNumber>Order #{order.orderNumber}</OrderNumber>
								<OrderDate>Order Placed: {order.purchasedOn}</OrderDate>
							</OrderDetailsWrapper>
							<HorizontalLineOrders />
						</OuterOrderGridWrapper>
					);
				})}
			</OrdersInnerWrapper>
		</OrdersWrapper>
	);
};

export default Orders;

const OrdersWrapper = styled(CheckoutWrapper)`
	width: 100%;

	padding: 0;
	justify-content: space-between;
	@media ${devices.mobileM} {
		font-size: 14px;
	}
`;

const OrdersInnerWrapper = styled.div`
	box-shadow: 0px 0px 20px -8px #000000;
	display: flex;
	padding: 50px 0;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	background-color: ${(props) => props.theme.colors.secondary};
	border-top-left-radius: 50px;
	border-top-right-radius: 50px;
`;

const OrdersHeading = styled.div`
	display: flex;
	padding: 30px;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	flex: 1;
`;

const OrdersGridWrapper = styled.div`
	width: 70%;
	padding: 30px 0px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	grid-gap: 2rem;
	@media ${devices.mobileM} {
		padding: 30px 30px;
	}
	@media ${devices.tablet} {
		justify-items: center;
	}
`;

const HorizontalLineOrders = styled(HorizontalLine)`
	width: 100%;
	align-self: center;
`;
const OuterOrderGridWrapper = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	@media ${devices.tabletL} {
		align-items: center;
	}
`;

const ShippingText = styled.div`
	font-size: 15px;
	font-weight: 900;
	display: flex;
	letter-spacing: 0.8px;
	text-transform: capitalize;
	justify-content: center;
	align-items: center;
	color: black;
	background-color: ${(props) => props.theme.brand};
	border-radius: 99px;
	padding: 5px 10px;
	margin-right: 5px;
`;

const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.brand};
	padding: 5px 10px;
	border-radius: 99px;
`;
const OrderDetailsWrapper = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	padding: 15px 0;
	justify-content: space-evenly;
	align-items: flex-start;
`;

const OrderTotal = styled.h2`
	padding: 15px 0px;
`;

const ShippingDetailsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	.MuiSvgIcon-root {
		color: #2c2f33;
	}
`;
const OrderNumber = styled.h4`
	opacity: 0.8;
`;
const OrderDate = styled.h4`
	opacity: 0.8;
`;

const NoOrdersWrapper = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;
