import React from "react";
import styled, { css, keyframes } from "styled-components";
import BackgroundSrcImage from "../images/homebackground1.jpg";
import { ReactComponent as Leaf } from "../images/leaf2.svg";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Products from "./Products";
import devices from "../styles/devices";
import LearnMore from "./LearnMore";
import Reviews from "./Reviews";
import Footer from "./Footer";
import { lightTheme } from "../styles/Themes";
import { FC } from "react";

const Home: FC = () => {
	const useStyles = makeStyles((theme) => ({
		button: {
			backgroundColor: "#49A010",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));

	const classes = useStyles();

	return (
		<HomeWrapper>
			<BackgroundWrapper>
				<BackgroundImageWrapper>
					<BackgroundImage src={BackgroundSrcImage} />
				</BackgroundImageWrapper>
				<ForeGroundWrapper>
					<LeafWrapper>
						<Leaf />
					</LeafWrapper>
					<h1>The nature candle.</h1>
					<h4>
						Green-friendly, hand crafted natural soy wax made to spice up the
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
			<Products />
			<LearnMore />
			<Reviews />
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
	height: 100%;
	scroll-snap-type: y mandatory;
	background-color: ${(props) => props.theme.colors.primary};
	@media ${devices.laptop} {
		margin-top: 70px;
	}
`;
const BackgroundWrapper = styled.div`
	width: 100%;
	position: relative;
	scroll-snap-align: start;
	@media ${devices.mobileXL} {
		min-height: 250px;
		padding: 40px 0;
	}
`;
const BackgroundImage = styled.img`
	height: auto;
	max-width: 100%;
`;
const BackgroundImageWrapper = styled.div`
	width: 100%;
	@media ${devices.mobileXL} {
		display: none;
	}
`;
const ForeGroundWrapper = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 20px;

	background-color: ${(props) =>
		props.theme == lightTheme
			? "rgba(250, 250, 250, 0.3)"
			: "rgba(128, 128, 128, 0.6)"};
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	width: 60%;
	height: 40%;

	> h4 {
		margin-bottom: 15px;
		@media ${devices.tablet} {
			font-size: 0.9rem;
		}
	}

	@media ${devices.mobileXL} {
		background: none;
		backdrop-filter: none;
	}

	@media ${devices.tablet} {
		width: 80%;
		height: 60%;
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
