import React from "react";
import styled from "styled-components";
import { ReactComponent as Check } from "../images/check.svg";

const LearnMoreDetail = ({ title, description }) => {
	return (
		<DetailWrapper>
			<Check />
			<Title>{title}: </Title>
			<Description>{description}</Description>
		</DetailWrapper>
	);
};

export default LearnMoreDetail;

const DetailWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 8px 0;
`;

const Title = styled.h3`
	margin: 0 8px;
`;

const Description = styled.h3``;
