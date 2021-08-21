import React from "react";
import { FC } from "react";
import styled from "styled-components";
import Review from "./Review";
const Reviews: FC = () => {
	return (
		<ReviewsWrapper id="reviews">
			<Header>
				<h1>Reviews</h1>
				<h4>Some quotes from our happy customers</h4>
			</Header>
			<GridWrapper>
				<Review
					rating={4}
					name="Luisa"
					picture={
						"https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
					}
					description="I love it! No more Air fresheners!"
				/>
			</GridWrapper>
		</ReviewsWrapper>
	);
};

export default Reviews;

const ReviewsWrapper = styled.div`
	width: 100%;
	background: ${(props) => props.theme.colors.primary};
	padding: 5rem 0;
	display: flex;
	scroll-snap-align: start;

	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const Header = styled.div`
	margin-bottom: 2rem;
	padding: 10px;
`;
const GridWrapper = styled.div`
	display: grid;
	width: 70%;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	grid-gap: 2rem;
`;
