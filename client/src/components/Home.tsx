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

const Home = () => {
	const useStyles = makeStyles((theme) => ({
		button: {
			marginTop: theme.spacing(6),
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
					>
						<h4>Browse the Collection</h4>
					</Button>
				</ForeGroundWrapper>
			</BackgroundWrapper>
			<Products />
			<LearnMore />
			<Reviews />
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
	height: 100vh;

	background-color: whitesmoke;
	margin-top: 35%;
`;
const BackgroundWrapper = styled.div`
	width: 100%;
	position: relative;
`;
const BackgroundImage = styled.img`
	height: auto;
	max-width: 100%;
`;
const BackgroundImageWrapper = styled.div`
	width: 100%;
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
	background-color: rgba(250, 250, 250, 50%);
	backdrop-filter: blur(10px);
	width: 60%;
	height: 40%;
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
