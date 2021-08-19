import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import * as action from "../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/reducers/index";
import { FC } from "react";
import { lightTheme } from "../styles/Themes";

type PropTypes = {
	title: string;
	price: number;
	image: string;
	productId: string;
	productWeight?: number;
	productQuantity: number;
	showQuantity: boolean;
	showAddToCart: boolean;
};
interface ProductSchema {
	productName: string;
	price: number;
	productId: string;
	productWeight: number;
}

const Product: FC<PropTypes> = ({
	title,
	price,
	image,
	productId,
	productQuantity,
	productWeight = 0,
	showQuantity,
	showAddToCart,
}) => {
	const user = useSelector((state: State) => state.user);
	const useStyles = makeStyles((theme) => ({
		button: {
			marginTop: theme.spacing(1),
			backgroundColor: "#54AD1A",
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
		price: number,
		productId: string,
		productWeight: number
	) => {
		if (productWeight !== undefined) {
			let order: ProductSchema = {
				productName,
				productId,
				productWeight,
				price,
			};
			dispatch(action.addToCart(userID, order));
		}
	};

	return (
		<ProductWrapper
			showQuantity={showQuantity}
			onClick={() => {
				handleClick(productId);
			}}
		>
			{showQuantity ? (
				<ProductQuanityWrapper>
					<h4>{productQuantity}</h4>
				</ProductQuanityWrapper>
			) : null}

			<ProductTop>
				<ImageWrapper>
					<img src={image} alt="candle" />
				</ImageWrapper>
			</ProductTop>

			<ProductBottom>
				<Name>{title}</Name>
				<Price>${price}</Price>
				{showAddToCart && (
					<Button
						variant="contained"
						className={classes.button}
						startIcon={<ShoppingCartIcon />}
						onClick={(e) => {
							e.stopPropagation();
							if (productWeight !== undefined)
								addToCart(user._id, title, price, productId, productWeight);
						}}
					>
						<h4>Add to Cart</h4>
					</Button>
				)}
			</ProductBottom>
		</ProductWrapper>
	);
};

export default Product;

const ProductWrapper = styled.div<{ showQuantity?: boolean }>`
	box-shadow: 0px 2px 15px 2px gray;

	max-width: ${(props) => (props.showQuantity == true ? "210px" : "unset")};
	border-radius: 5px;
	padding: 20px;
	background-color: ${(props) => props.theme.colors.secondary};
	cursor: pointer;
	position: relative;
	transition: all 0.3s ease;
	:hover {
		transform: scale(1.1);
	}
`;

const ProductTop = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;
const ProductQuanityWrapper = styled.div`
	position: absolute;
	top: 15px;
	right: 15px;
	width: 30px;
	height: 30px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => (props.theme == lightTheme ? "white" : "black")};
	border-radius: 50%;
	background: ${(props) => props.theme.brand};
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
