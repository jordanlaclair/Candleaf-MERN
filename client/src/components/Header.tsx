import React from "react";
import styled, { css, keyframes } from "styled-components";
import { ReactComponent as Logo } from "../images/leaf.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
const Header = () => {
	return (
		<HeaderWrapper>
			<HeaderLeft>
				<LogoWrapper>
					<Logo />
				</LogoWrapper>
				<h2>Candleaf</h2>
			</HeaderLeft>

			<HeaderMiddle>
				<Discovery>
					<div>
						<h3>Discovery</h3>
					</div>
					<ExpandMoreIcon />
				</Discovery>

				<About>
					<h3>About</h3>
				</About>
				<Contact>
					<h3>Contact Us</h3>
				</Contact>
			</HeaderMiddle>

			<HeaderRight>
				<PermIdentityIcon />
				<ShoppingCartOutlinedIcon />
			</HeaderRight>
		</HeaderWrapper>
	);
};

export default Header;

const slideDown = keyframes`

0% {
		transform: translateY(0%);
	}
	50%{
		transform: translateY(25%);
	}
	65%{
		transform: translateY(-4%);
	}
	80%{
		transform: translateY(4%);
	}
	95%{
		transform: translateY(-2%);
	}			
	100% {
		transform: translateY(0%);
	}	

`;

const HeaderWrapper = styled.div`
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	background-color: whitesmoke;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: 15px 0;
	z-index: 999;
`;

const HeaderLeft = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	color: green;

	> div {
		width: 40px;
		margin-right: 5px;
		height: auto;
	}

	> div > svg {
		max-width: 100%;
		height: auto;
	}
`;

const Discovery = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	text-align: center;
	position: relative;
	transition: all 0.3s ease;

	:hover {
		transform: scale(1.1);
		.MuiSvgIcon-root {
			animation: ${slideDown} 1s ease-in;
		}
	}

	.MuiSvgIcon-root {
		transition: all 0.3s ease;
	}

	:hover::after {
		position: absolute;
		content: "";
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2px;
		text-align: center;
		left: 0;
		top: 2.5rem;
		background-color: black;
	}
`;

const Contact = styled.div`
	position: relative;
	cursor: pointer;
	transition: all 0.3s ease;

	:hover {
		transform: scale(1.1);
	}
	:hover::after {
		position: absolute;
		content: "";
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2px;
		text-align: center;
		left: 0;
		top: 2.5rem;
		background-color: black;
	}
`;
const About = styled.div`
	position: relative;
	cursor: pointer;
	transition: all 0.3s ease;

	:hover {
		transform: scale(1.1);
	}
	:hover::after {
		position: absolute;
		content: "";
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2px;
		text-align: center;
		left: 0;
		top: 2.5rem;
		background-color: black;
	}
`;

const LogoWrapper = styled.div``;

const HeaderMiddle = styled.div`
	flex: 2;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`;

const HeaderRight = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-evenly;
	align-items: center;

	.MuiSvgIcon-root {
		transition: all 0.3s ease;
		cursor: pointer;
		transform: scale(1.2);
		:hover {
			transform: scale(1.4);
		}
	}
`;
