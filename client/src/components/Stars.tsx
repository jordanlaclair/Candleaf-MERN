import styled from "styled-components";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { FC } from "react";
interface PropTypes {
	rating: number;
	showAverageRating?: boolean;
}
const Stars: FC<PropTypes> = ({ rating, showAverageRating }) => {
	const stars = [];
	for (let i = 1; i <= 5; i++) {
		if (i <= rating) {
			stars.push(<StarIcon />);
		} else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
			stars.push(<StarHalfIcon />);
		} else {
			stars.push(<StarBorderIcon />);
		}
	}
	return (
		<StarsWrapper>
			{stars} {showAverageRating ? <h3>{`(${rating})`}</h3> : null}
		</StarsWrapper>
	);
};

export default Stars;

const StarsWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px 0;
	white-space: nowrap;
	> h3 {
		margin-left: 5px;
	}
	.MuiSvgIcon-root {
		color: #49a010;
	}
`;
