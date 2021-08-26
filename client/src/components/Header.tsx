import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as Logo } from "../assets/images/leaf.svg";
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
import { useEffect } from "react";
import { FC } from "react";
import { signOut } from "../store/actions/usersActionCreator";

const Header: FC = () => {
	interface NewUserSchema {
		firstName: string;
		lastName: string;
		auth0ID: string;
	}

	const { loginWithRedirect } = useAuth0();
	const { logout } = useAuth0();
	const firstName = useSelector((state: State) => state.user.firstName);
	const { user, isAuthenticated } = useAuth0();
	const dispatch = useDispatch();
	const history = useHistory();
	const [themeSwitch, setThemeSwitch] = useState<boolean>(true);
	const [cartItemsCount, setCartItemsCount] = useState(0);

	const cart = useSelector((state: State) => state.user.cart);
	useEffect(() => {
		let cartItems = 0;
		cart.forEach((product) => {
			cartItems += product.productQuantity;
		});
		setCartItemsCount(cartItems);
	}, [cart]);

	const handleSwitch = () => {
		dispatch(action.toggleTheme());
		setThemeSwitch((prevState) => {
			return !prevState;
		});
	};

	useEffect(() => {
		console.log(isAuthenticated);
		if (isAuthenticated) {
			console.log("here 1");
			// non-null assertion operator tells typescript that even though it can be null, it can trust you that its not
			let newUser: NewUserSchema = {
				firstName: user?.given_name!,
				lastName: user?.family_name!,
				auth0ID: user?.sub!,
			};
			dispatch(action.createUser(newUser));
		} else if (!isAuthenticated && firstName == "Guest") {
			console.log("here 2");
			let newUser: NewUserSchema = {
				firstName: "Guest",
				lastName: "",
				auth0ID: "",
			};
			dispatch(action.createUser(newUser));
		}
	}, [isAuthenticated]);

	const handleLogIn = () => {
		if (user == undefined) {
			loginWithRedirect();
		} else {
			dispatch(signOut());
			logout();
		}
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
	const handleHomeTop = () => {
		history.push("/");
	};
	const handleHomeProducts = () => {
		history.push("/#products");
	};
	const handleHomeAbout = () => {
		history.push("/#about");
	};
	const handleHomeOrders = () => {
		history.push("/orders");
	};
	return (
		<HeaderWrapper>
			<HeaderLeft>
				<LogoTitle onClick={handleHomeTop}>
					<LogoWrapper>
						<Logo />
					</LogoWrapper>
					<h2>Candleaf</h2>
				</LogoTitle>
			</HeaderLeft>

			<HeaderMiddle>
				<Discovery>
					<div>
						<a onClick={handleHomeProducts} href="#products">
							<h3>Discovery</h3>
						</a>
					</div>
					<ExpandMoreIcon />
				</Discovery>

				<About>
					<a onClick={handleHomeAbout} href="#about">
						<h3>About</h3>
					</a>
				</About>
				<Orders>
					<a onClick={handleHomeOrders}>
						<h3>Your Orders</h3>
					</a>
				</Orders>
			</HeaderMiddle>

			<HeaderRight>
				<UserStatus
					onClick={() => {
						handleLogIn();
					}}
				>
					<Status>{!isAuthenticated ? "Sign In" : "Sign Out"}</Status>
					{isAuthenticated ? (
						<UserProfilePicture src={user?.picture} />
					) : (
						<PermIdentityIcon />
					)}
				</UserStatus>
				<CartWrapper
					onClick={() => {
						history.push("/cart");
					}}
				>
					<ShoppingCartOutlinedIcon />
					{cartItemsCount > 0 ? <h3>({cartItemsCount})</h3> : null}
				</CartWrapper>

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

const HeaderWrapper = styled.div`
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	box-shadow: inset 0px 0px 20px -8px #000000;
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

const CartWrapper = styled.div`
	display: flex;
	justify-content: center;
	cursor: pointer;
	align-items: center;
	transition: all 0.3s ease;

	:hover {
		transform: scale(1.2);
	}
	> h3 {
		margin-left: 5px;
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
	.MuiSvgIcon-root {
		@media ${devices.laptop} {
			display: none;
		}
	}
`;

const LogoTitle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
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

const Orders = styled.div`
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
		transform: scale(1.2);
	}
	@media ${devices.tablet} {
		display: none;
	}
`;

const Status = styled.h3`
	cursor: pointer;
	margin-right: 20px;
`;

const UserProfilePicture = styled.img`
	border-radius: 50%;
	width: 35px;
	height: auto;
`;
