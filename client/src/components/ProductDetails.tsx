import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import * as api from "../apis/memories";
import { Button, makeStyles, withStyles } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Footer from "./Footer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import Radio from "@material-ui/core/Radio";
import { lightTheme } from "../styles/Themes";

const ProductDetails = () => {
	const [productQuantity, setProductQuantity] = useState(0);
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

	const handleAdd = () => {
		setProductQuantity((prevState) => {
			return prevState + 1;
		});
	};

	const handleSubtract = () => {
		setProductQuantity((prevState) => {
			return prevState - 1;
		});
	};
	useEffect(() => {
		fetchCandle(id);
	}, []);

	const [purchase, setPurchase] = useState("One time purchase");
	useEffect(() => {
		console.log(purchase);
	}, [purchase]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPurchase(event.target.value);
	};

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
				<ProductDetailsRightWrapper>
					<ProductDetailsRight>
						<ProductDetailsRightLeft>
							<ProductTitle>{candleData.title} &reg;</ProductTitle>
							<ProductPrice>$4.99</ProductPrice>
							<ProductOptions></ProductOptions>
							<ProductQuantityWrapper>
								<h3>Quantity</h3>
								<QuantityBottomWrapper>
									<IndeterminateCheckBoxIcon onClick={handleSubtract} />

									<h3>{productQuantity}</h3>
									<AddBoxIcon onClick={handleAdd} />
								</QuantityBottomWrapper>
							</ProductQuantityWrapper>

							<Button
								variant="contained"
								className={classes.button}
								startIcon={<ShoppingCartIcon />}
							>
								<h4>Add to Cart</h4>
							</Button>
						</ProductDetailsRightLeft>

						<ProductDetailsRightRight>
							<h2>Purchase Options</h2>
							<PurchaseOption>
								<Radio
									checked={purchase === "One Time Purchase"}
									onChange={handleChange}
									value="One Time Purchase"
									color="default"
									name="radio-button-demo"
									inputProps={{ "aria-label": "One Time Purchase" }}
								/>
								<h4>One Time Purchase</h4>
							</PurchaseOption>
							<PurchaseOption>
								<Radio
									checked={purchase === "Subscription"}
									onChange={handleChange}
									value="Subscription"
									color="default"
									name="radio-button-demo"
									inputProps={{ "aria-label": "Subscription" }}
								/>
								<h4>Subscription with Discount</h4>
							</PurchaseOption>
						</ProductDetailsRightRight>
					</ProductDetailsRight>
					<ProductSpecs>
						<ProductSpecsDetail>
							<span>Wax:</span> asklfajf;kj;fdlaksjd;lfj
						</ProductSpecsDetail>
						<ProductSpecsDetail>
							<span>Fragrance:</span>
						</ProductSpecsDetail>
						<ProductSpecsDetail>
							<span>Burning Time:</span>
						</ProductSpecsDetail>
						<ProductSpecsDetail>
							<span>Dimensions:</span>
						</ProductSpecsDetail>
						<ProductSpecsDetail>
							<span>Weight:</span>
						</ProductSpecsDetail>
					</ProductSpecs>
				</ProductDetailsRightWrapper>
			</ProductDetailsWrapper>

			<Footer />
		</ProductDetailsOuterWrapper>
	);
};

export default ProductDetails;

const ProductDetailsWrapper = styled.div`
	width: 80%;
	margin-top: 100px;
	padding: 100px 50px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ProductSpecs = styled.div`
	width: 100%;
	padding: 25px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 15px 0;
	border-radius: 8px;
	align-items: flex-start;
	color: ${(props) => props.theme.colors.primary};
	background-color: ${(props) =>
		props.theme == lightTheme ? "#4F4F4F" : props.theme.colors.opposite};
`;
const ProductSpecsDetail = styled.div`
	> span {
		font-weight: bold;
	}
`;

const ProductDetailsOuterWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
`;

const ProductDetailsRightWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

const ImageWrapper = styled.div`
	width: 450px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f7f8fa;
	> img {
		object-fit: contain;
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

const PurchaseOption = styled.div`
	display: flex;
	padding: 5px;
	justify-content: flex-start;
	align-items: center;
	text-align: start;
`;
const ProductDetailsRight = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const ProductDetailsRightLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;
const ProductDetailsRightRight = styled.div`
	margin-left: 30px;

	padding: 30px;
	color: ${(props) => props.theme.colors.primary};
	background-color: ${(props) =>
		props.theme == lightTheme ? "#4F4F4F" : props.theme.colors.opposite};
	border-radius: 8px;
`;

const ProductTitle = styled.h1`
	text-align: start;
`;

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

const ProductDescription = styled.h3`
	margin-top: 14px;
	padding: 5px;
	width: 70%;
`;

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
		width: 35px;
	}

	.MuiSvgIcon-root {
		cursor: pointer;
		font-size: 2rem;
	}
`;
