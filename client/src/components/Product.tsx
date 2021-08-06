import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import * as action from "../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/reducers/index";
import { FC } from "react";

type PropTypes = {
	title: string;
	price: number;
	image: string;
	productId: string;
	productQuantity: number;
};
interface OrdersSchema {
	productName: string;
	productId: string;
	totalPrice: number;
	productQuantity: number;
}

const Product: FC<PropTypes> = ({
	title,
	price,
	image,
	productId,
	productQuantity,
}) => {
	const user = useSelector((state: State) => state.user);
	const useStyles = makeStyles((theme) => ({
		button: {
			marginTop: theme.spacing(1),
			backgroundColor: "#49A010",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();
	const handleClick = (id: string) => {
		history.push(`/products/candles/${id}`);
		console.log("hi");
	};

	const addToCart = (
		userID: string,
		productName: string,
		totalPrice: number,
		productId: string,
		productQuantity: number
	) => {
		let order: OrdersSchema = {
			productName,
			productId,
			totalPrice,
			productQuantity,
		};
		dispatch(action.addToCart(userID, order));
	};

	return (
		<ProductWrapper
			onClick={() => {
				handleClick(productId);
			}}
		>
			<ProductTop>
				<ImageWrapper>
					<img src={image} alt="candle" />
				</ImageWrapper>
			</ProductTop>

			<ProductBottom>
				<Name>{title}</Name>

				<Price>${price}</Price>
				<Button
					variant="contained"
					className={classes.button}
					startIcon={<ShoppingCartIcon />}
					onClick={() => {
						addToCart(user._id, title, price, productId, productQuantity);
					}}
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
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	overflow: hidden;
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
	color: ${(props) => props.theme.brand};
`;
