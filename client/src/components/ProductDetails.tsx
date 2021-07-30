import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import * as api from "../apis/memories";
import { Button, makeStyles } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Footer from "./Footer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
const ProductDetails = () => {
	const useStyles = makeStyles((theme) => ({
		button: {
			marginTop: theme.spacing(1),
			backgroundColor: "#49A010",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));
	const classes = useStyles();

	interface CandleSchema {
		title: string;
		message: string;
		tags: [string];
		purchaseCount: number;
		image: string;
	}
	let initialState: CandleSchema = {
		title: "",
		message: "",
		tags: [""],
		purchaseCount: 0,
		image: "",
	};
	const [candleData, setCandleData] = useState<CandleSchema>(initialState);

	interface DataTypes {
		id: string;
	}
	const { id }: DataTypes = useParams();

	const fetchCandle = async (id: string) => {
		const { data } = await api.fetchCandle(id);
		setCandleData(data);
	};
	useEffect(() => {
		fetchCandle(id);
	}, []);

	return (
		<ProductDetailsOuterWrapper>
			<ProductDetailsWrapper>
				<ProductDetailsLeft>
					<ImageWrapper>
						<img src={candleData.image} alt="candle" />
					</ImageWrapper>
					<ProductDescription>{candleData.message}</ProductDescription>
					<ProductSale>
						<h4>Free Shipping! </h4>
						<LocalShippingIcon />
					</ProductSale>
				</ProductDetailsLeft>
				<ProductDetailsRight>
					<ProductTitle>{candleData.title}</ProductTitle>
					<ProductPrice>$4.99</ProductPrice>
					<ProductOptions></ProductOptions>
					<ProductQuantityWrapper>
						<h3>Quantity</h3>
						<QuantityBottomWrapper>
							<AddBoxIcon />
							<h3>3</h3>
							<IndeterminateCheckBoxIcon />
						</QuantityBottomWrapper>
					</ProductQuantityWrapper>

					<Button
						variant="contained"
						className={classes.button}
						startIcon={<ShoppingCartIcon />}
					>
						<h4>Add to Cart</h4>
					</Button>
				</ProductDetailsRight>
			</ProductDetailsWrapper>
			<Footer />
		</ProductDetailsOuterWrapper>
	);
};

export default ProductDetails;

const ProductDetailsWrapper = styled.div`
	width: 80%;
	margin-top: 100px;
	padding: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ProductDetailsOuterWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
`;

const ImageWrapper = styled.div`
	width: 350px;

	background-color: #f7f8fa;
	> img {
		max-width: 100%;
		height: auto;
	}
`;

const ProductDetailsLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 40px;
	align-items: center;
	width: 50%;
`;
const ProductDetailsRight = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

const ProductTitle = styled.h1``;

const ProductPrice = styled.h3`
	color: #49a010;
`;

const ProductOptions = styled.div``;

const ProductQuantityWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 40px 0;
`;

const ProductDescription = styled.h3``;

const ProductSale = styled.h2`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	color: #49a010;

	.MuiSvgIcon-root {
		margin-left: 5px;
		font-size: 2.5rem;
	}
`;
const QuantityBottomWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px;

	> h3 {
		margin: 0 5px;
	}

	.MuiSvgIcon-root {
		cursor: pointer;
		font-size: 2rem;
	}
`;
