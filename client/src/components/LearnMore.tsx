import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import CandleGroup from "../images/CandleGroup.jpg";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import LearnMoreDetail from "./LearnMoreDetail";
const LearnMore = () => {
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
		<LearnMoreWrapper id="about">
			<LearnMoreLeft>
				<Header>
					<h1>Clean and fragrant soy wax</h1>
					<h4>Made for your home and for your wellness</h4>
				</Header>
				<Body>
					<LearnMoreDetail
						title="Eco-sustainable"
						description="All recyclable materials, 0% CO2 emissions"
					/>
					<LearnMoreDetail
						title="Long burning"
						description="Handcrafted to last long"
					/>
					<LearnMoreDetail
						title="Handmade"
						description="All candles are carefully crafted with love"
					/>
					<LearnMoreDetail
						title="Hyphoallergenic"
						description="100% natural, human-friendly ingredients"
					/>
				</Body>
				<Button
					variant="contained"
					className={classes.button}
					startIcon={<EmojiPeopleIcon />}
				>
					<h4>Learn More</h4>
				</Button>
			</LearnMoreLeft>
			<LearnMoreRight>
				<ImageWrapper>
					<img src={CandleGroup} alt="candles" />
				</ImageWrapper>
			</LearnMoreRight>
		</LearnMoreWrapper>
	);
};

export default LearnMore;

const LearnMoreWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-evenly;
	align-items: center;
	background: #fefefe;
	padding: 50px 0px;
	scroll-margin-top: 3rem;
	scroll-snap-align: center;
`;

const LearnMoreLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: flex-start;
	height: 100%;
	padding: 0 60px;
`;
const LearnMoreRight = styled.div`
	justify-content: center;
	align-items: center;
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	text-align: start;
	> h4 {
		color: #49a010;
	}
`;
const Body = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex-direction: column;
	align-items: flex-start;
	text-align: start;
`;

const ImageWrapper = styled.div`
	width: 800px;
	> img {
		height: auto;
		max-width: 100%;
	}
`;
