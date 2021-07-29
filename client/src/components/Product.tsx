import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
type PropTypes = {
	name: string;
	price: number;
	image: string;
	id: number;
};
const Product = ({ name, price, image, id }: PropTypes) => {
	let history = useHistory();

	const useStyles = makeStyles((theme) => ({
		button: {
			marginTop: theme.spacing(1),
			backgroundColor: "#49A010",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));

	const classes = useStyles();

	const handleProductSelect = (id: Number) => {
		history.push(`/products/candles/${id}`);
	};

	return (
		<ProductWrapper
			onClick={() => {
				handleProductSelect(id);
			}}
		>
			<ProductTop>
				<ImageWrapper>
					<img src={image} alt="candle" />
				</ImageWrapper>
			</ProductTop>

			<ProductBottom>
				<Name>{name}</Name>

				<Price>${price}</Price>
				<Button
					variant="contained"
					className={classes.button}
					startIcon={<ShoppingCartIcon />}
				>
					<h4>Add to Cart</h4>
				</Button>
			</ProductBottom>
		</ProductWrapper>
	);
};

export default Product;

const ProductWrapper = styled.div`
	box-shadow: 0px 2px 15px 2px gray;
	border-radius: 5px;
	padding: 20px;
	background-color: ${(props) => props.theme.colors.secondary};
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
	width: 100%;
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
