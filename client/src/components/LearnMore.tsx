import { Button, makeStyles } from "@material-ui/core";
import React, { FC, useEffect } from "react";
import styled from "styled-components";
import CandleGroup from "../assets/images/CandleGroup1.jpg";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import LearnMoreDetail from "./LearnMoreDetail";
import devices from "../styles/devices";
import Rellax from "rellax";

const LearnMore: FC = () => {
	const useStyles = makeStyles((theme) => ({
		button: {
			marginTop: theme.spacing(6),
			backgroundColor: "#49A010",
			textTransform: "inherit",
			fontFamily: "inherit",
		},
	}));
	useEffect(() => {
		new Rellax(".animateLearnMore", {
			speed: 1.5,
			center: true,
			round: true,
			vertical: true,
			horizontal: false,
		});
	}, []);

	const classes = useStyles();
	return (
		<LearnMoreWrapper id="about">
			<LearnMoreLeft>
				<Header
					className="animateLearnMore"
					data-rellax-xs-speed="5"
					data-rellax-mobile-speed="3"
					data-rellax-tablet-speed="3"
				>
					<h1>Clean and fragrant soy wax</h1>
					<h4>Made for your home and for your wellness</h4>
				</Header>
				<Body>
					<div
						className="animateLearnMore"
						data-rellax-xs-speed="6"
						data-rellax-mobile-speed="3"
						data-rellax-tablet-speed="3"
					>
						<LearnMoreDetail
							title="Eco-sustainable"
							description="All recyclable materials, 0% CO2 emissions"
						/>
					</div>

					<div
						className="animateLearnMore"
						data-rellax-xs-speed="6"
						data-rellax-mobile-speed="3"
						data-rellax-tablet-speed="3"
					>
						<LearnMoreDetail
							title="Long burning"
							description="Handcrafted to last long"
						/>
					</div>

					<div
						className="animateLearnMore"
						data-rellax-xs-speed="6"
						data-rellax-mobile-speed="3"
						data-rellax-tablet-speed="3"
					>
						<LearnMoreDetail
							title="Handmade"
							description="All candles are carefully crafted with love"
						/>
					</div>

					<div
						className="animateLearnMore"
						data-rellax-xs-speed="6"
						data-rellax-mobile-speed="3"
						data-rellax-tablet-speed="3"
					>
						<LearnMoreDetail
							title="Hyphoallergenic"
							description="100% natural, human-friendly ingredients"
						/>
					</div>

					<div
						className="animateLearnMore"
						data-rellax-xs-speed="6"
						data-rellax-mobile-speed="3"
						data-rellax-tablet-speed="3"
					>
						<Button
							variant="contained"
							className={classes.button}
							startIcon={<EmojiPeopleIcon />}
						>
							<h4>Learn More</h4>
						</Button>
					</div>
				</Body>
			</LearnMoreLeft>
			<LearnMoreRight>
				<ImageWrapper
					className="animateLearnMore"
					data-rellax-xs-speed="5"
					data-rellax-mobile-speed="3"
					data-rellax-tablet-speed="3"
				>
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
	background: ${(props) => props.theme.colors.secondary};
	padding: 135px 0px;
	scroll-margin-top: 3rem;
	scroll-snap-align: center;
	@media ${devices.laptop} {
		flex-direction: column;
	}
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	text-align: start;
	margin-bottom: 10px;
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

	> button {
		@media ${devices.laptop} {
			display: none;
		}
	}
`;

const ImageWrapper = styled.div`
	width: 100%;
	@media ${devices.laptop} {
		margin-top: 2rem;
	}
	> img {
		height: auto;
		max-width: 100%;
	}
`;
