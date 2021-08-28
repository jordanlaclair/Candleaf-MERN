import React, { FC, useEffect, useState } from "react";
import { createReview, fetchReviewsFromCandle } from "../apis/review";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
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
import { lightTheme } from "../styles/Themes";
import CheckMarkLottie from "../assets/lotties/checkmark.json";
import StarGrow from "../assets/lotties/starGrow.json";
import StarEmpty from "../assets/lotties/starEmpty.json";
import Lottie from "react-lottie";
import Reviews from "./Reviews";
const ProductDetails: FC = () => {
	const history = useHistory();
	const [productQuantity, setProductQuantity] = useState(1);
	const [productPurchasedBefore, setProductPurchasedBefore] = useState(false);
	const [reviewTitle, setReviewTitle] = useState("");
	const [reviewDescription, setReviewDescription] = useState("");
	const [showCheckMark, setShowCheckMark] = useState(false);
	const { user, isAuthenticated } = useAuth0();
	const firstName = useSelector((state: State) => state.user.firstName);
	const [reviewRating, setReviewRating] = useState(0);
	const [starState, setStarState] = useState({
		firstStar: true,
		secondStar: true,
		thirdStar: true,
		fourthStar: true,
		fifthStar: false,
	});
	const checkMarkLottieOptions = {
		loop: false,
		autoplay: true,
		animationData: CheckMarkLottie,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	useEffect(() => {
		let ratingValue = Object.values(starState).filter((star) => {
			return star == true;
		});

		setReviewRating(ratingValue.length);
	}, [starState]);

	const userID = useSelector((state: State) => state.user._id);
	const orders = useSelector((state: State) => state.user.orders);
	const starNormalOptions = {
		loop: false,
		autoplay: true,
		animationData: StarGrow,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	const emptyStarOptions = {
		loop: false,
		autoplay: true,
		animationData: StarEmpty,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
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

	interface ReviewTypes {
		title: string;
		name: string;
		description: string;
		rating: number;
		candleID: string;
		userPicture: string;
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
	const candleInitialState: CandleSchema = {
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
	const reviewsInitialState: ReviewsArray = [];

	type ReviewsArray = Array<ReviewTypes>;

	const [candleData, setCandleData] =
		useState<CandleSchema>(candleInitialState);
	const [candleReviews, setCandleReviews] =
		useState<ReviewsArray>(reviewsInitialState);

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

	const fetchReviewsForCandle = async (id: string) => {
		const { data } = await fetchReviewsFromCandle(id);
		setCandleReviews(data);
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
	const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShowCheckMark(true);
		let newReview: ReviewTypes = {
			candleID: id,
			title: reviewTitle,
			description: reviewDescription,
			name: firstName,
			rating: reviewRating,
			userPicture:
				user?.picture ||
				"https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
		};
		createReview(newReview);
		history.push("/");
		history.push(`/products/candles/${id}`);
	};

	useEffect(() => {
		if (candleData.title !== "") {
			let hasBeenPurchased = productIsPurchased(candleData.title);
			if (hasBeenPurchased) {
				setProductPurchasedBefore(true);
			}
		}
	}, [candleData]);

	useEffect(() => {
		if (id.length > 1) {
			fetchCandle(id);
			fetchReviewsForCandle(id);
		}
	}, []);

	useEffect(() => {
		console.log(productPurchasedBefore);
	}, [productPurchasedBefore]);

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
				hasThisProduct = order.data.some((i) =>
					i.productName.includes(candleName)
				);
				if (hasThisProduct) break;
			}
		}
		return hasThisProduct;
	};

	const handleStarsClicked = (starsClicked: number) => {
		if (starsClicked == 1) {
			setStarState(() => {
				return {
					firstStar: true,
					secondStar: false,
					thirdStar: false,
					fourthStar: false,
					fifthStar: false,
				};
			});
		} else if (starsClicked == 2) {
			setStarState(() => {
				return {
					firstStar: true,
					secondStar: true,
					thirdStar: false,
					fourthStar: false,
					fifthStar: false,
				};
			});
		} else if (starsClicked == 3) {
			setStarState(() => {
				return {
					firstStar: true,
					secondStar: true,
					thirdStar: true,
					fourthStar: false,
					fifthStar: false,
				};
			});
		} else if (starsClicked == 4) {
			setStarState(() => {
				return {
					firstStar: true,
					secondStar: true,
					thirdStar: true,
					fourthStar: true,
					fifthStar: false,
				};
			});
		} else if (starsClicked == 5) {
			setStarState(() => {
				return {
					firstStar: true,
					secondStar: true,
					thirdStar: true,
					fourthStar: true,
					fifthStar: true,
				};
			});
		}
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
				showCheckMark ? (
					<ReviewCompleteWrapper>
						<h2>Review Submitted!</h2>
						<LottieWrapperCheck>
							<Lottie
								options={checkMarkLottieOptions}
								isClickToPauseDisabled={true}
							/>
						</LottieWrapperCheck>
					</ReviewCompleteWrapper>
				) : (
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
							<ReviewSectionWrapperLottie>
								<h4>Rating</h4>
								<LottieWrapper
									onClick={() => {
										handleStarsClicked(1);
									}}
								>
									{starState.firstStar ? (
										<Lottie
											isClickToPauseDisabled={true}
											options={starNormalOptions}
										/>
									) : (
										<Lottie
											isClickToPauseDisabled={true}
											options={emptyStarOptions}
										/>
									)}
								</LottieWrapper>
								<LottieWrapper
									onClick={() => {
										handleStarsClicked(2);
									}}
								>
									{starState.secondStar ? (
										<Lottie
											isClickToPauseDisabled={true}
											options={starNormalOptions}
										/>
									) : (
										<Lottie
											isClickToPauseDisabled={true}
											options={emptyStarOptions}
										/>
									)}
								</LottieWrapper>
								<LottieWrapper
									onClick={() => {
										handleStarsClicked(3);
									}}
								>
									{starState.thirdStar ? (
										<Lottie
											isClickToPauseDisabled={true}
											options={starNormalOptions}
										/>
									) : (
										<Lottie
											isClickToPauseDisabled={true}
											options={emptyStarOptions}
										/>
									)}
								</LottieWrapper>
								<LottieWrapper
									onClick={() => {
										handleStarsClicked(4);
									}}
								>
									{starState.fourthStar ? (
										<Lottie
											isClickToPauseDisabled={true}
											options={starNormalOptions}
										/>
									) : (
										<Lottie
											isClickToPauseDisabled={true}
											options={emptyStarOptions}
										/>
									)}
								</LottieWrapper>
								<LottieWrapper
									onClick={() => {
										handleStarsClicked(5);
									}}
								>
									{starState.fifthStar ? (
										<Lottie
											isClickToPauseDisabled={true}
											options={starNormalOptions}
										/>
									) : (
										<Lottie
											isClickToPauseDisabled={true}
											options={emptyStarOptions}
										/>
									)}
								</LottieWrapper>
							</ReviewSectionWrapperLottie>
							<ReviewSectionWrapper>
								<h4>Title</h4>
								<ReviewTitle
									type="text"
									required
									minLength={4}
									value={reviewTitle}
									onChange={(e) => {
										setReviewTitle(e.target.value);
									}}
								/>
							</ReviewSectionWrapper>
							<ReviewSectionWrapper>
								<h4>Description</h4>
								<ReviewDescription
									required
									minLength={4}
									value={reviewDescription}
									onChange={(e) => {
										setReviewDescription(e.target.value);
									}}
								/>
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
				)
			) : null}
			{candleReviews.length > 0 ? (
				<Reviews
					reviewsArray={candleReviews}
					subtitle={`Reviews for ${candleData.title}`}
				/>
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
	box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.39);
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
	background-color: ${(props) => props.theme.colors.secondary};
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
	box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.39);

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
	box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.39);
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
	margin: 3rem 0px;
`;

const UserHeaderInfo = styled.div`
	position: absolute;
	top: 20px;
	left: 27px;
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
	align-items: flex-start;
	margin: 16px 0;
	margin-bottom: 8px;
	width: 100%;
	> h4 {
		margin-bottom: 11px;
		border: 1px solid
			${(props) =>
				props.theme == lightTheme
					? props.theme.brand
					: props.theme.colors.primary};
		background-color: ${(props) =>
			props.theme == lightTheme
				? props.theme.brand
				: props.theme.colors.primary};
		border-radius: 8px;
		padding: 4px 8px;
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
	font-weight: bold;
	font-size: 15px;
	padding: 15px;
`;
const ReviewDescription = styled.textarea`
	outline: none;
	background: transparent;
	border: 1px solid gray;
	color: ${(props) => props.theme.text};
	font-family: inherit;
	font-size: 14px;
	border-radius: 8px;
	margin: none;
	padding: 13px;
	width: 98%;
	min-height: 200px;
	resize: none;
`;

const LottieWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 80px;
	cursor: pointer;
`;
const ReviewSectionWrapperLottie = styled(ReviewSectionWrapper)`
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

const LottieWrapperCheck = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 250px;

	margin: 20px 0;
`;
const ReviewCompleteWrapper = styled.div`
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> h2 {
		margin-top: 10px;
	}
`;
