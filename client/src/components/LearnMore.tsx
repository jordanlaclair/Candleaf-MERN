import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { ReactComponent as CandleGroup } from "../images/candleGroup.svg";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
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
		<LearnMoreWrapper>
			<LearnMoreLeft>
				<Header>
					<h1>Clean and fragrant soy wax</h1>
					<h4>Made for your home and for your wellness</h4>
				</Header>
				<Body>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
					ratione dolore esse labore velit ex facilis in obcaecati, dignissimos
					neque recusandae tempore? Sit quaerat quis id cupiditate deleniti
					voluptate fuga.
				</Body>
				<Button
					variant="contained"
					className={classes.button}
					startIcon={<EmojiPeopleIcon />}
				>
					<h4>Browse the Collection</h4>
				</Button>
			</LearnMoreLeft>
			<LearnMoreRight>
				<ImageWrapper>
					<CandleGroup />
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
	background: #f7f8fa;
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
	> h4 {
		color: #49a010;
	}
`;
const Body = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	text-align: start;
`;

const ImageWrapper = styled.div`
	width: 800px;
	> svg {
		height: auto;
		max-width: 100%;
	}
`;
