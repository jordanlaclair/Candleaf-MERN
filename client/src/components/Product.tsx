import React from "react";
import styled from "styled-components";
import Candle from "../images/candle.jpg";
type PropTypes = {
	name: string;
	price: number;
};
const Product = ({ name, price }: PropTypes) => {
	return (
		<ProductWrapper>
			<ProductTop>
				<ImageWrapper>
					<img src={Candle} alt="candle" />
				</ImageWrapper>
			</ProductTop>

			<ProductBottom>
				<Name>{name}</Name>
				<Price>${price}</Price>
			</ProductBottom>
		</ProductWrapper>
	);
};

export default Product;

const ProductWrapper = styled.div`
	box-shadow: 0px 2px 15px 2px gray;
	border-radius: 5px;
	padding: 20px;
	cursor: pointer;
	transition: all 0.3s ease;
	:hover {
		transform: scale(1.1);
	}
`;

const ProductTop = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;
const ImageWrapper = styled.div`
	width: 400px;
	> img {
		max-width: 100%;
		height: auto;
	}
`;
const ProductBottom = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

const Name = styled.h3``;
const Price = styled.h3`
	color: #49a010;
`;
