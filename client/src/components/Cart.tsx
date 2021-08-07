import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { State } from "../store/reducers";
import CartItem from "./CartItem";

const Cart: FC = () => {
	const history = useHistory();
	const handleBackToHome = () => {
		history.push("/");
	};
	const dispatch = useDispatch();
	const cart = useSelector((state: State) => state.user.cart);

	return (
		<CheckoutWrapper>
			<Title>Your Cart Items</Title>

			<SubTitle onClick={handleBackToHome}>Back To Shopping</SubTitle>
			<CartItemWrapper>
				{cart.map((item) => {
					return (
						<CartItem
							productId={item.productId}
							productName={item.productName}
							totalPrice={item.totalPrice}
							productQuantity={item.productQuantity}
							price={item.price}
						/>
					);
				})}
			</CartItemWrapper>
		</CheckoutWrapper>
	);
};

export default Cart;

const CheckoutWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 100px;
`;

const Title = styled.h1``;
const CartItemWrapper = styled.div`
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
`;
const SubTitle = styled.h2`
	text-decoration: underline;
	color: ${(props) => props.theme.brand};
	cursor: pointer;
`;
