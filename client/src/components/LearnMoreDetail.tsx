import React, { FC } from "react";
import styled from "styled-components";
import { ReactComponent as Check } from "../images/check.svg";
import devices from "../styles/devices.js";
import DoneAllIcon from "@material-ui/icons/DoneAll";
interface PropTypes {
	title: string;
	description: string;
}
const LearnMoreDetail: FC<PropTypes> = ({ title, description }) => {
	return (
		<DetailWrapper>
			<Header>
				<DoneAllIcon />
				<Title>{title}: </Title>
			</Header>
			<Description>{description}</Description>
		</DetailWrapper>
	);
};

export default LearnMoreDetail;
const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const DetailWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	margin: 8px 0;
	@media ${devices.laptopL} {
		flex-direction: column;
	}
`;

const Title = styled.h3`
	margin: 0 8px;
`;

const Description = styled.h3``;
