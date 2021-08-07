import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import * as api from "../apis/products";
import { Button, makeStyles, withStyles } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Footer from "./Footer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import Radio from "@material-ui/core/Radio";
import { lightTheme } from "../styles/Themes";
import Spinner from "react-spinkit";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/reducers";
import { addToCart } from "../store/actions";
const ProductDetails: FC = () => {
	const [productQuantity, setProductQuantity] = useState(0);
	const user = useSelector((state: State) => state.user);
	const useStyles = makeStyles((theme) => ({
		button: {
			marginTop: theme.spacing(1),
			backgroundColor: "#49A010",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));
	const classes = useStyles();
	const dispatch = useDispatch();
	interface ProductSchema {
		productName: string;
		price: number;
		productId: string;
	}
	interface CandleSchema {
		title: string;
		message: string;
		tags: [string];
		purchaseCount: number;
		image: string;
		wax: string;
		fragrance: string;
		burningTime: string;
		dimensions: string;
		weight: string;
		price: number;
	}
	let initialState: CandleSchema = {
		title: "",
		message: "",
		tags: [""],
		purchaseCount: 0,
		image: "",
		wax: "",
		fragrance: "",
		burningTime: "",
		dimensions: "",
		weight: "",
		price: 0,
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

	const handleAddToCart = (
		productName: string,
		price: number,
		productId: string
	) => {
		let order: ProductSchema = {
			productName,
			price,
			productId,
		};

		dispatch(addToCart(user._id, order));
	};

	return (
		<ProductDetailsOuterWrapper>
			{candleData.title == "" ? (
				<LoadingWrapper>
					<Spinner color="green" name="ball-grid-beat" fadeIn="none" />
				</LoadingWrapper>
			) : (
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
								<ProductPrice>${candleData.price}</ProductPrice>
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
									onClick={() => {
										handleAddToCart(user._id, candleData.price, id);
									}}
									startIcon={<ShoppingCartIcon />}
								>
									<h4>Add to Cart</h4>
								</Button>
							</ProductDetailsRightLeft>
						</ProductDetailsRight>
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
								<h4
									onClick={() => {
										setPurchase("One Time Purchase");
									}}
								>
									One Time Purchase
								</h4>
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
								<h4
									onClick={() => {
										setPurchase("Subscription");
									}}
								>
									Subscription with Discount
								</h4>
							</PurchaseOption>
						</ProductDetailsRightRight>
						<ProductSpecs>
							<ProductSpecsDetail flex="row">
								<h3>Wax: </h3> &nbsp; <h4>{candleData.wax}</h4>
							</ProductSpecsDetail>
							<ProductSpecsDetail flex="column">
								<h3>Fragrance: </h3> <h4>{candleData.fragrance}</h4>
							</ProductSpecsDetail>
							<ProductSpecsDetail flex="row">
								<h3>Burning Time: </h3> &nbsp; <h4>{candleData.burningTime}</h4>
							</ProductSpecsDetail>
							<ProductSpecsDetail flex="row">
								<h3>Dimensions: </h3> &nbsp; <h4>{candleData.dimensions}</h4>
							</ProductSpecsDetail>
							<ProductSpecsDetail flex="row">
								<h3>Weight: </h3> &nbsp; <h4>{candleData.weight}</h4>
							</ProductSpecsDetail>
						</ProductSpecs>
					</ProductDetailsRightWrapper>
				</ProductDetailsWrapper>
			)}
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

const LoadingWrapper = styled.div`
	position: relative;
	display: flex;
	background-color: transparent;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 100%;
	padding: 250px 0;
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
	background-color: ${(props) => props.theme.colors.secondary};
`;
const ProductSpecsDetail = styled.div<{ flex: string }>`
	display: flex;
	justify-content: center;
	flex-direction: ${(props) => (props.flex == "row" ? "row" : "column")};
	align-items: flex-end;
	text-align: start;
	> h3 {
		align-self: flex-start;
	}
	> h4 {
		opacity: 0.7;
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
	width: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f7f8fa;
	border-radius: 10px;
	> img {
		object-fit: contain;
	}
`;

const ProductDetailsLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 20px;
	align-items: center;
	width: 50%;
`;

const PurchaseOption = styled.div`
	display: flex;
	padding: 5px;
	justify-content: flex-start;
	align-items: center;
	text-align: start;
	> h4 {
		cursor: pointer;
	}
`;
const ProductDetailsRight = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
const ProductDetailsRightLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 15px;
`;
const ProductDetailsRightRight = styled.div`
	margin-top: 15px;
	padding: 25px;
	width: 100%;
	background-color: ${(props) => props.theme.colors.secondary};
	border-radius: 8px;
`;

const ProductTitle = styled.h1`
	text-align: start;
`;

const ProductPrice = styled.h2`
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
