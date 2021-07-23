import React from "react";
import styled, { css, keyframes } from "styled-components";
import BackgroundSrcImage from "../images/homebackground.jpg";
const Home = () => {
	return (
		<HomeWrapper>
			<BackgroundWrapper>
				<BackgroundImageWrapper>
					<BackgroundImage src={BackgroundSrcImage} />
				</BackgroundImageWrapper>
				<ForeGroundWrapper>
					<h2>sdkflj</h2>
				</ForeGroundWrapper>
			</BackgroundWrapper>
		</HomeWrapper>
	);
};

export default Home;

const HomeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	background-color: whitesmoke;
`;
const BackgroundWrapper = styled.div`
	width: 100%;
	position: relative;
`;
const BackgroundImage = styled.img`
	height: auto;
	max-width: 100%;
`;
const BackgroundImageWrapper = styled.div`
	width: 100%;
`;
const ForeGroundWrapper = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: rgba(250, 250, 250, 50%);
	backdrop-filter: blur(10px);
	width: 800px;
	height: 400px;
`;
