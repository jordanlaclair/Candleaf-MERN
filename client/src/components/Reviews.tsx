import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import devices from "../styles/devices";
import Review from "./Review";
import Stars from "./Stars";

interface ReviewTypes {
	rating: number;
	name: string;
	userPicture: string;
	title: string;
	description: string;
}

interface ReviewsPropTypes {
	subtitle?: string;
	reviewsArray: ReviewsArray;
	showAverageRatings: boolean;
	showDescription: boolean;
}

type ReviewsArray = Array<ReviewTypes>;
const Reviews: FC<ReviewsPropTypes> = ({
	reviewsArray,
	subtitle,
	showDescription,
	showAverageRatings,
}) => {
	const [averageRating, setAverageRating] = useState(5);
	const calculateAverageRating = () => {
		let totalRatings = 0;
		for (const product of reviewsArray) {
			totalRatings += product.rating;
		}
		setAverageRating(totalRatings / reviewsArray.length);
	};
	useEffect(() => {
		calculateAverageRating();
	}, []);
	return (
		<ReviewsWrapper>
			<Header>
				<h1>Reviews</h1>
				<h3>{subtitle}</h3>
			</Header>
			{showAverageRatings ? (
				<Stars rating={averageRating} showAverageRating={true} />
			) : null}

			<HorizontalLine />
			<GridWrapper>
				{reviewsArray.map((review) => {
					return (
						<Review
							rating={review.rating}
							name={review.name}
							picture={review.userPicture}
							title={review.title}
							description={showDescription ? review.description : null}
						/>
					);
				})}
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
	@media ${devices.mobileXL} {
		font-size: 14px;
	}
`;
const Header = styled.div`
	padding: 10px;
	> h3 {
		opacity: 0.8;
	}
`;
const GridWrapper = styled.div`
	display: grid;
	width: 70%;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	grid-gap: 2rem;
`;
const HorizontalLine = styled.hr`
	width: 65%;
	background-color: ${(props) => props.theme.brand};
	border: 1.5px solid ${(props) => props.theme.brand};
	margin-top: 1.5rem;
	margin-bottom: 2rem;
`;
