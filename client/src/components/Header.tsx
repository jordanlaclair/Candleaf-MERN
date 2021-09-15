import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as Logo } from "../assets/images/leaf.svg";
import "../assets/css/header.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Switch from "@material-ui/core/Switch";
import { green } from "@material-ui/core/colors";
import { State } from "../store/reducers";
import { withStyles } from "@material-ui/core/styles";
import { Filters } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/actions";
import { useHistory } from "react-router-dom";
import devices from "../styles/devices";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { getAuthUser } from "../store/actions/usersActionCreator";
import { FC } from "react";
import { signOut } from "../store/actions/usersActionCreator";
import { v4 as uuidv4 } from "uuid";
import * as usersApi from "../apis/users";
import { updateCandles } from "../store/actions";

const Header: FC = () => {
	interface Auth0Schema {
		firstName: string;
		lastName: string;
		auth0ID: string;
		guestID?: string;
	}

	const { loginWithRedirect } = useAuth0();
	const { logout } = useAuth0();
	const firstName = useSelector((state: State) => state.user.firstName);
	const id = useSelector((state: State) => state.user._id);
	const filter = useSelector((state: State) => state.user.filter);
	const candles = useSelector((state: State) => state.candles);
	const [filtersExpanded, setFiltersExpanded] = useState(false);
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
		handleChangeCandles(filter);
	}, [filter]);

	const handleChangeCandles = (filter: Filters) => {
		if (filter == Filters.LOWEST_PRICE) {
			let newArr = candles
				.filter((elem) => true)
				.sort((a, b) => {
					return a.price - b.price;
				});
			dispatch(updateCandles(newArr));
		} else if (filter == Filters.HIGHEST_PRICE) {
			let newArr = candles
				.filter((elem) => true)
				.sort((a, b) => {
					return b.price - a.price;
				});
			dispatch(updateCandles(newArr));
		} else if (filter == Filters.MOST_POPULAR) {
			let newArr = candles
				.filter((elem) => true)
				.sort((a, b) => {
					return b.purchaseCount - a.purchaseCount;
				});

			dispatch(updateCandles(newArr));
		} else if (filter == Filters.LONGEST_BURNING_TIME) {
			let newArr = candles
				.filter((elem) => true)
				.sort((a, b) => {
					const num1 = parseInt(a.burningTime.replace(/[^0-9]/g, ""));
					const num2 = parseInt(b.burningTime.replace(/[^0-9]/g, ""));
					return num2 - num1;
				});

			dispatch(updateCandles(newArr));
		}
	};

	const handleFilter = (filter: Filters) => {
		if (isAuthenticated) {
			dispatch(action.updateFilter(user?.sub!, filter, "auth"));
		} else {
			dispatch(action.updateFilter(id, filter, "guest"));
		}
	};

	const showMenu = (toggleId: string, navId: string) => {
		const toggle = document.getElementById(toggleId),
			nav = document.getElementById(navId);

		if (toggle && nav) {
			toggle.addEventListener("click", show);
		}
	};

	function show() {
		const navMenu = document.getElementById("nav-menu");
		navMenu?.classList.toggle("show");
	}

	function linkAction(this: Element) {
		//active link
		const navLink = document.querySelectorAll(".nav__link");
		navLink.forEach((n) => n.classList.remove("active"));
		this.classList.add("active");

		//remove menu
		const navMenu = document.getElementById("nav-menu");
		navMenu?.classList.remove("show");
	}

	useEffect(() => {
		showMenu("nav-toggle", "nav-menu");

		const navLink = document.querySelectorAll(".nav__link");
		if (navLink) {
			//remove nav after click
			navLink.forEach((n) => n.addEventListener("click", linkAction));
		}

		return () => {
			window.removeEventListener("click", show);
			window.removeEventListener("click", linkAction);
		};
	}, []);

	const handleGuestLogin = async (id: string) => {
		const response = await usersApi.fetchUser(id);
		const responseCode = response?.status;
		if (responseCode == 404) {
			dispatch(action.createUser({ firstName: "Guest" }));
		} else {
			dispatch(action.getUser(id));
		}
	};

	const handleAuthLogin = async (id: string) => {
		const response = await usersApi.fetchAuthUser(id);
		const responseCode = response?.status;
		if (responseCode == 404) {
			dispatch(
				action.createUser({
					firstName: user?.name,
					lastName: user?.family_name,
					email: user?.email,
					auth0ID: id,
				})
			);
		} else {
			dispatch(getAuthUser(id));
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			handleAuthLogin(user?.sub!);
		} else if (!isAuthenticated) {
			handleGuestLogin(id);
		}
	}, [isAuthenticated]);

	const handleLogIn = () => {
		if (user == undefined) {
			loginWithRedirect();
		} else {
			logout({ returnTo: window.location.origin });
		}
	};

	const GreenSwitch = withStyles({
		switchBase: {
			color: green[500],
			overflow: "hidden",
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

					<Test></Test>
				</LogoTitle>
			</HeaderLeft>
			<NavMenu id="nav-menu">
				<HeaderMiddle id="nav__links">
					<Discovery onClick={handleHomeProducts}>
						<DiscoveryTop>
							<div className="nav__link">
								<a href="#products">
									<h3>Products</h3>
								</a>
							</div>
							<ExpandMoreIcon
								onClick={(e) => {
									e.stopPropagation();
									setFiltersExpanded((prevState) => {
										return !prevState;
									});
								}}
							/>
						</DiscoveryTop>
						<DiscoveryDropDown expanded={filtersExpanded}>
							<h4
								onClick={() => {
									setFiltersExpanded(false);
									handleFilter(Filters.LOWEST_PRICE);
								}}
							>
								Lowest Price
							</h4>
							<h4
								onClick={() => {
									setFiltersExpanded(false);
									handleFilter(Filters.HIGHEST_PRICE);
								}}
							>
								Highest Price
							</h4>

							<h4
								onClick={() => {
									setFiltersExpanded(false);
									handleFilter(Filters.MOST_POPULAR);
								}}
							>
								Most Popular
							</h4>

							<h4
								onClick={() => {
									setFiltersExpanded(false);
									handleFilter(Filters.LONGEST_BURNING_TIME);
								}}
							>
								Longest Burning Time
							</h4>
						</DiscoveryDropDown>
					</Discovery>

					<About onClick={handleHomeAbout} className="nav__link">
						<a href="#about">
							<h3>About</h3>
						</a>
					</About>
					<Orders onClick={handleHomeOrders} className="nav__link">
						<a>
							<h3>Your Orders</h3>
						</a>
					</Orders>
					<UserStatus
						onClick={() => {
							handleLogIn();
						}}
						className="nav__link"
					>
						<Status>{!isAuthenticated ? "Sign In" : "Sign Out"}</Status>
						{isAuthenticated ? (
							<UserProfilePicture src={user?.picture} />
						) : (
							<PermIdentityIcon />
						)}
					</UserStatus>
					<CartWrapper
						className="nav__link"
						onClick={() => {
							history.push("/cart");
						}}
					>
						<CartHeading>Cart</CartHeading>
						<ShoppingCartOutlinedIcon />

						{cartItemsCount > 0 ? <h3>({cartItemsCount})</h3> : null}
					</CartWrapper>
					<SwitchWrapper>
						<GreenSwitch
							checked={themeSwitch}
							onChange={() => {
								handleSwitch();
							}}
						/>
					</SwitchWrapper>
				</HeaderMiddle>
			</NavMenu>
			<HamBurgerMenu id="nav-toggle">
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

const HeaderWrapper = styled.nav`
	position: sticky;
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
	position: relative;
	justify-content: flex-start;
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
	justify-content: space-between;
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
		top: 2.3rem;
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
	z-index: 998;
	flex-direction: row;
	justify-content: center;
	align-items: center;
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
		bottom: -5px;
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
		top: 2.3rem;
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
		top: 2.3rem;
		background-color: ${(props) => props.theme.brand};
	}
`;

const LogoWrapper = styled.div``;

const HeaderMiddle = styled.div`
	flex: 2;
	display: flex;
	background-color: transparent;
	justify-content: space-evenly;
	align-items: center;
	@media ${devices.tablet} {
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		flex: 1;
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

const Status = styled.h3`
	cursor: pointer;
	margin-right: 20px;
	white-space: nowrap;
	@media ${devices.mobileXL} {
		padding-right: 15px;
	}
`;

const UserProfilePicture = styled.img`
	border-radius: 50%;
	max-width: 35px;
	height: auto;
`;

const NavMenu = styled.div`
	flex: 3;
	width: 100%;

	display: flex;
	justify-content: center;
	align-items: flex-start;
	transition: 0.5s;

	@media ${devices.tablet} {
		position: fixed;
		background-color: ${(props) => props.theme.colors.primary};
		right: -100%;
		top: 77px;
		width: 30%;
		height: 85%;
		padding: 2rem;
		flex-direction: column;
		transition: 0.5s;
		* {
			text-align: start;
			width: auto;
		}
	}
	@media ${devices.mobileM} {
		width: 50%;
		font-size: 10px;
	}
	@media ${devices.mobileXL} {
		font-size: 14px;
	}
`;

const CartHeading = styled.h3`
	display: none;

	@media ${devices.tablet} {
		display: block;
		margin-right: 12px;
	}
`;
const Test = styled.h3``;

const SwitchWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	@media ${devices.tablet} {
		width: 100%;
	}
`;

interface DropDownProps {
	expanded: boolean;
}
const DiscoveryDropDown = styled.div<DropDownProps>`
	display: flex;
	font-size: 14px;
	background: ${(props) => props.theme.colors.secondary};
	position: absolute;
	height: ${(props) => (props.expanded ? "auto" : "0")};
	top: ${(props) => (props.expanded ? "100%" : "-100%")};
	opacity: ${(props) => (props.expanded ? "1" : "0")};
	left: 50%;
	white-space: nowrap;
	overflow: hidden;
	text-align: start;
	transition: 1s ease;
	transform: translate(-41%, 7%);
	width: auto;
	flex-direction: column;
	justify-content: center;
	padding: ${(props) => (props.expanded ? "5px 10px" : "0")};
	align-items: flex-start;
	> h4 {
		overflow: hidden;
		cursor: pointer;
		padding: ${(props) => (props.expanded ? "15px 10px 15px 0" : "0")};

		:hover {
			color: ${(props) => props.theme.brand};
		}
	}
`;
const DiscoveryTop = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;
