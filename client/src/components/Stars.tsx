import React from "react";
import styled from "styled-components";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import { FC } from "react";
interface PropTypes {
	rating: number;
}
const Stars: FC<PropTypes> = ({ rating }) => {
	const stars = [];
	for (let i = 1; i <= 5; i++) {
		if (i <= rating) {
			stars.push(<StarIcon />);
		} else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
			stars.push(<StarHalfIcon />);
		} else {
			continue;
		}
	}
	return <StarsWrapper>{stars}</StarsWrapper>;
};

export default Stars;

const StarsWrapper = styled.div`
	white-space: nowrap;
	.MuiSvgIcon-root {
		color: #49a010;
	}
`;
