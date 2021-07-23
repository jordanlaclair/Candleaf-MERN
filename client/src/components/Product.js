import React from "react";
import styled from "styled-components";
import { ReactComponent as Candle } from "../images/candle.svg";

const Product = () => {
	return (
		<ProductWrapper>
			<ProductTop>&nbsp;</ProductTop>

			<Candle />
			<ProductBottom>
				<h3>Spiced Mint</h3>
			</ProductBottom>
		</ProductWrapper>
	);
};

export default Product;

const ProductWrapper = styled.div``;

const ProductTop = styled.div`
	height: auto;
`;

const ProductBottom = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: auto;
`;
