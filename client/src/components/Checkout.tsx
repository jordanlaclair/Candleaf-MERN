import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Checkout: FC = () => {
	const history = useHistory();
	const handleBackToHome = () => {
		history.push("/");
	};
	return (
		<CheckoutWrapper>
			<Title>Your Cart Items</Title>
			<SubTitle onClick={handleBackToHome}>Back To Shopping</SubTitle>
			<GridWrapper></GridWrapper>
		</CheckoutWrapper>
	);
};

export default Checkout;

const CheckoutWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1``;

const SubTitle = styled.h2`
	text-decoration: underline;
	color: ${(props) => props.theme.colors};
`;

const GridWrapper = styled.div`
	width: 70%;
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;
