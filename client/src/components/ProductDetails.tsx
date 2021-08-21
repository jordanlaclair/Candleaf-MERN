import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import * as api from "../apis/products";
import { Button, makeStyles } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Footer from "./Footer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import Radio from "@material-ui/core/Radio";
import Spinner from "react-spinkit";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/reducers";
import { addSpecificAmount } from "../store/actions";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { HorizontalLine } from "./Checkout";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { useAuth0 } from "@auth0/auth0-react";
const ProductDetails: FC = () => {
	const [productQuantity, setProductQuantity] = useState(1);
	const [productPurchasedBefore, setProductPurchasedBefore] = useState(false);

	const { user, isAuthenticated } = useAuth0();
	const userID = useSelector((state: State) => state.user._id);
	const orders = useSelector((state: State) => state.user.orders);

	const useStyles = makeStyles((theme) => ({
		button: {
			marginTop: theme.spacing(3),
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
	interface ProductSchema {
		productName: string;
		price: number;
		productId: string;
		productWeight: number;
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
			if (prevState > 1) {
				return prevState - 1;
			}
			return prevState;
		});
	};
	const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {};
	useEffect(() => {
		fetchCandle(id);
	}, []);

	useEffect(() => {
		if (candleData.title !== "") {
			let hasBeenPurchased = productIsPurchased(candleData.title);
			if (hasBeenPurchased) {
				setProductPurchasedBefore(true);
			}
		}
	}, [candleData]);

	const [purchase, setPurchase] = useState("One time purchase");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPurchase(event.target.value);
	};

	const stringWeightToInt = (weight: string) => {
		return parseInt(weight.replace("g", ""), 10);
	};

	const handleAddToCart = (
		productId: string,
		productWeight: string,
		productName: string,
		price: number,
		userId: string,
		quantity: number
	) => {
		let intWeight = stringWeightToInt(productWeight);

		let candleData: ProductSchema = {
			productId,
			price,
			productWeight: intWeight,
			productName,
		};
		dispatch(addSpecificAmount(userId, candleData, quantity));
		setProductQuantity(1);
	};

	const productIsPurchased = (candleName: string) => {
		let hasThisProduct: boolean = false;
		if (orders.length > 0) {
			for (const order of orders) {
				hasThisProduct = order.some((i) => i.productName.includes(candleName));
				if (hasThisProduct) break;
			}
		}
		return hasThisProduct;
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
							<h5>Free Shipping this coming December! </h5>
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
										handleAddToCart(
											id,
											candleData.weight,
											candleData.title,
											candleData.price,
											userID,
											productQuantity
										);
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
									Purchase with Subscription
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
			{productPurchasedBefore ? (
				<ReviewsOuterWrapper>
					<h2>Leave a Review!</h2>
					<HorizontalLineReviews />
					<ReviewsWrapper onSubmit={handleSubmitReview}>
						{isAuthenticated ? (
							<UserHeaderInfo>
								<UserProfilePicture src={user?.picture} />
								<h3>{user?.name}</h3>
							</UserHeaderInfo>
						) : (
							<UserHeaderInfo>
								<PermIdentityIcon />
								<h3>Guest</h3>
							</UserHeaderInfo>
						)}
						<ReviewSectionWrapper>
							<h4>Title</h4>
							<ReviewTitle type="text" required minLength={5} />
						</ReviewSectionWrapper>
						<ReviewSectionWrapper>
							<h4>Description</h4>
							<ReviewDescription required minLength={5} />
						</ReviewSectionWrapper>
						<Button
							variant="contained"
							className={classes.button}
							startIcon={<RateReviewIcon />}
							type="submit"
						>
							<h4>Submit Review</h4>
						</Button>
					</ReviewsWrapper>
				</ReviewsOuterWrapper>
			) : null}

			<Footer />
		</ProductDetailsOuterWrapper>
	);
};

export default ProductDetails;

const ProductDetailsWrapper = styled.div`
	width: 100%;
	margin-top: 70px;
	padding-top: 80px;
	padding-bottom: 20px;
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
	width: 70%;
	padding: 25px 40px;
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

export const PurchaseOption = styled.div`
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
	padding-left: 25px;
	padding-right: 55px;
	width: 70%;
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
const ReviewsWrapper = styled.form`
	padding: 60px 40px;
	padding-bottom: 45px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	position: relative;
	border-radius: 8px;
	align-items: flex-start;
	background-color: ${(props) => props.theme.colors.secondary};
	width: 50%;
	margin-bottom: 2rem;
`;

const ReviewsOuterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
`;

const HorizontalLineReviews = styled(HorizontalLine)`
	width: 65%;
	background-color: ${(props) => props.theme.brand};
	border: 1.5px solid ${(props) => props.theme.brand};
	margin: 2rem 0px;
`;

const UserHeaderInfo = styled.div`
	position: absolute;
	top: 20px;
	left: 20px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	white-space: nowrap;
	width: 20%;
`;

const UserProfilePicture = styled.img`
	border-radius: 50%;
	width: 35px;
	height: auto;
`;

const ReviewSectionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: column;
	align-items: flex-start;
	margin: 15px 0;
	width: 100%;
	> h4 {
		margin-bottom: 5px;
	}
`;

const ReviewTitle = styled.input`
	outline: none;
	background: transparent;
	border: 1px solid gray;
	color: ${(props) => props.theme.text};
	font-family: inherit;
	width: 40%;
	border-radius: 8px;
	margin: none;
	padding: 10px;
`;
const ReviewDescription = styled.textarea`
	outline: none;
	background: transparent;
	border: 1px solid gray;
	color: ${(props) => props.theme.text};
	font-family: inherit;
	border-radius: 8px;
	margin: none;
	padding: 13px;
	width: 98%;
	min-height: 200px;
	resize: none;
`;
