import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BackgroundImageWallpaper from "../assets/images/background.jpg";
import { ReactComponent as Leaf } from "../assets/images/leaf2.svg";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Products from "./Products";
import devices from "../styles/devices";
import LearnMore from "./LearnMore";
import Reviews from "./Reviews";
import { fetchReviews } from "../apis/review";
import Footer from "./Footer";
import { lightTheme } from "../styles/Themes";
import { FC } from "react";
import { State } from "../store/reducers";
import { useSelector } from "react-redux";

const Home: FC = () => {
	interface ReviewTypes {
		title: string;
		name: string;
		description: string;
		rating: number;
		candleID: string;
		userPicture: string;
	}
	type ReviewsArray = Array<ReviewTypes>;
	const candles = useSelector((state: State) => state.candles);
	const filter = useSelector((state: State) => state.user.filter);

	const [recentReviews, setRecentReviews] = useState<ReviewsArray>([]);
	const useStyles = makeStyles((theme) => ({
		button: {
			backgroundColor: "#54AD1A",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));

	const classes = useStyles();

	const fetchRecentReviews = async () => {
		let { data } = await fetchReviews();
		//only show the three most recent reviews
		if (data.length > 2) {
			data = data.slice(data.length - 3);
			setRecentReviews(data);
		}
	};

	useEffect(() => {
		fetchRecentReviews();
	}, []);

	return (
		<HomeWrapper>
			<BackgroundWrapper>
				<BackgroundImageWrapper>
					<BackgroundImage src={BackgroundImageWallpaper} />
				</BackgroundImageWrapper>
				<ForeGroundWrapper>
					<LeafWrapper>
						<Leaf />
					</LeafWrapper>
					<h1>The nature candle.</h1>
					<h4>
						Green-friendly, hand crafted, natural soy wax made to spice up the
						best moments.
					</h4>
					<Button
						variant="contained"
						className={classes.button}
						startIcon={<StorefrontIcon />}
						href="#products"
					>
						<h4>Browse the Collection</h4>
					</Button>
				</ForeGroundWrapper>
			</BackgroundWrapper>
			<Products newCandles={candles} />
			<LearnMore />
			{recentReviews.length > 0 ? (
				<Reviews
					reviewsArray={recentReviews}
					showAverageRatings={false}
					showDescription={false}
					subtitle={"Some recent quotes from our happy customers!"}
				/>
			) : null}
			<Footer />
		</HomeWrapper>
	);
};

export default Home;

const HomeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
	background-color: ${(props) => props.theme.colors.primary};

	@media ${devices.mobileXL} {
		font-size: 14px;
	}
`;
const BackgroundWrapper = styled.div`
	width: 100%;
	position: relative;
	max-height: 92vh;
	overflow: hidden;
	@media ${devices.mobileXL} {
		min-height: 250px;
		padding: 40px 0;
	}
`;
const BackgroundImage = styled.img`
	height: auto;
	width: 100%;
`;
const BackgroundImageWrapper = styled.div`
	margin-top: -300px;

	width: 100%;
	@media ${devices.mobileXL} {
		display: none;
	}
	@media ${devices.laptopL} {
		margin: 0px;
	}
`;
const ForeGroundWrapper = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: center;
	align-items: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 20px;

	background-color: ${(props) =>
		props.theme === lightTheme
			? "rgba(250, 250, 250, 0.3)"
			: "rgba(79, 79, 79, 0.7)"};
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	width: 60%;
	height: 40%;

	> h4 {
		width: 80%;
		margin-top: 8px;
		margin-bottom: 15px;
		@media ${devices.tablet} {
			font-size: 0.9rem;
		}
	}
	@media ${devices.tabletL} {
		width: 80%;
		height: 60%;
		padding: 0px;
	}
	@media ${devices.mobileXL} {
		background: ${(props) => props.theme.colors.secondary};
		width: 100%;
		height: 100%;
		backdrop-filter: none;
	}
`;
const LeafWrapper = styled.div`
	width: 40px;
	height: auto;

	@media ${devices.laptop} {
		width: 30px;
	}

	> svg {
		max-width: 100%;
		height: auto;
	}
`;
