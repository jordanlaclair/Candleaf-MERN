import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../store/reducers";
import devices from "../styles/devices";
import { CheckoutWrapper } from "./Cart";
import { HorizontalLine } from "./Checkout";
import Order from "./Order";
import Product from "./Product";

const Orders = () => {
	const orders = useSelector((state: State) => state.user.orders);
	const candles = useSelector((state: State) => state.candles);

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
`;

const OrdersInnerWrapper = styled.div`
	box-shadow: 0px 0px 20px -8px #000000;
	display: flex;
	padding: 50px 0;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
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
	padding: 30px 50px;
	display: grid;
	justify-items: center;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	grid-gap: 2rem;
`;

const HorizontalLineOrders = styled(HorizontalLine)`
	width: 95%;
	align-self: center;
`;
const OuterOrderGridWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	@media ${devices.tabletL} {
		align-items: center;
	}
`;
