import React from "react";
import styled from "styled-components";
import { skipPartiallyEmittedExpressions } from "typescript";
import PropTypes from "prop-types";

import Stars from "./Stars";
type AppProps = {
	rating: number;
	name: string;
	picture: string;
	description: string;
};
const Review = ({ picture, rating, description, name }: AppProps) => {
	return (
		<ReviewWrapper>
			<ImageWrapper>
				<img src={picture} alt="profile picture" />
			</ImageWrapper>
			<Stars rating={rating} />
			<Description>"{description}"</Description>
			<Name>{name}</Name>
		</ReviewWrapper>
	);
};

export default Review;

const ReviewWrapper = styled.div`
	background: ${(props) => props.theme.colors.secondary};
	border-radius: 5px;
	box-shadow: 0px 2px 15px 2px gray;
	display: flex;
	padding: 40px;

	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const ImageWrapper = styled.div`
	width: 50px;
	> img {
		max-width: 100%;
		height: auto;
		border-radius: 50%;
	}
`;
const Description = styled.h2``;

const Name = styled.h4`
	color: gray;
`;

Review.propTypes = {
	rating: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	picture: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};
