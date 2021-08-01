import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { ReactComponent as Logo } from "../images/leaf.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Switch from "@material-ui/core/Switch";
import { green } from "@material-ui/core/colors";
import { State } from "../store/reducers";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/actions";
import { useHistory } from "react-router-dom";
import devices from "../styles/devices";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
	const { loginWithRedirect } = useAuth0();
	const dispatch = useDispatch();
	const history = useHistory();
	const [themeSwitch, setThemeSwitch] = useState(true);
	const handleSwitch = () => {
		dispatch(action.toggleTheme());
		setThemeSwitch((prevState) => {
			return !prevState;
		});
	};

	const GreenSwitch = withStyles({
		switchBase: {
			color: green[300],
			"&$checked": {
				color: green[500],
			},
			"&$checked + $track": {
				backgroundColor: green[500],
			},
		},
		checked: {},
		track: {},
	})(Switch);
	const handleHome = () => {
		history.push("/");
	};
	return (
		<HeaderWrapper>
			<HeaderLeft>
				<LogoTitle>
					<LogoWrapper>
						<Logo />
					</LogoWrapper>
					<h2 onClick={handleHome}>Candleaf</h2>
				</LogoTitle>
			</HeaderLeft>

			<HeaderMiddle>
				<Discovery>
					<div>
						<a href="#products">
							<h3>Discovery</h3>
						</a>
					</div>
					<ExpandMoreIcon />
				</Discovery>

				<About>
					<a href="#about">
						<h3>About</h3>
					</a>
				</About>
				<Contact>
					<a href="#orders">
						<h3>Your Orders</h3>
					</a>
				</Contact>
			</HeaderMiddle>

			<HeaderRight>
				<UserStatus>
					<MenuWrapper>
						<PermIdentityIcon />
						<MenuItemWrapper>
							<MenuItem>1</MenuItem>
							<MenuItem>2</MenuItem>
							<MenuItem>3</MenuItem>
						</MenuItemWrapper>
					</MenuWrapper>
				</UserStatus>

				<ShoppingCartOutlinedIcon
					onClick={() => {
						history.push("/checkout");
					}}
				/>
				<GreenSwitch
					checked={themeSwitch}
					onChange={() => {
						handleSwitch();
					}}
				/>
			</HeaderRight>
			<HamBurgerMenu>
				<Bar />
				<Bar />
				<Bar />
			</HamBurgerMenu>
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
const fadeIn = keyframes`
  0% { opacity: 0; }
    100% { flex: 1; opacity: 1; }

`;
const HeaderWrapper = styled.div`
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	background-color: ${(props) => props.theme.colors.primary};
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: 15px 0;
	z-index: 999;
	@media ${devices.tablet} {
		justify-content: space-between;
	}
`;

const HeaderLeft = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.brand};
	@media ${devices.tablet} {
		justify-content: flex-start;
		margin-left: 20px;
	}
`;
const UserStatus = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;
const MenuWrapper = styled.div`
	display: flex;
	flex-flow: column nowrap;
	position: relative;

	:hover > div {
		animation: 240ms ${fadeIn} linear forwards;
	}
	.MuiSvgIcon-root {
	}
`;
const MenuItemWrapper = styled.div`
	height: 0;
	opacity: 0;
	width: auto;
	background-color: white;
	display: flex;
	position: absolute;
	margin-top: 95px;

	left: -38px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: all 1s ease;
`;
const MenuItem = styled.div`
	display: flex;
	justify-content: center;
	background-color: white;
	width: 100px;
	align-items: center;
	cursor: pointer;
	padding: 10px;
	:hover {
		background-color: ${(props) => props.theme.colors.secondary};
	}
`;
const LogoTitle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	> div {
		width: 40px;
		margin-right: 5px;
		height: auto;
	}

	> div > svg {
		max-width: 100%;
		height: auto;
	}
	> h2 {
		cursor: pointer;
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
	div > a {
		text-decoration: none;
		color: inherit;
	}
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
		background-color: ${(props) => props.theme.brand};
	}
`;

const Contact = styled.div`
	position: relative;
	cursor: pointer;
	transition: all 0.3s ease;
	> a {
		text-decoration: none;
		color: inherit;
	}
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
		background-color: ${(props) => props.theme.brand};
	}
`;
const About = styled.div`
	position: relative;
	cursor: pointer;
	transition: all 0.3s ease;
	> a {
		text-decoration: none;
		color: inherit;
	}

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
		background-color: ${(props) => props.theme.brand};
	}
`;

const LogoWrapper = styled.div``;

const HeaderMiddle = styled.div`
	flex: 2;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	@media ${devices.tablet} {
		display: none;
	}
`;

const HamBurgerMenu = styled.div`
	display: none;
	margin-left: 5px;
	padding: 0 20px;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background: transparent;
	width: 35px;
	cursor: pointer;

	@media ${devices.tablet} {
		display: flex;
	}
`;
const Bar = styled.div`
	background: ${(props) => props.theme.colors.opposite};
	width: 100%;
	height: 2px;
	margin: 3px;
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
	@media ${devices.tablet} {
		display: none;
	}
`;
