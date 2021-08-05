import React, { FC } from "react";
import styled from "styled-components";
import { ReactComponent as Icon } from "../images/icon.svg";
import devices from "../styles/devices";
const Footer: FC = () => {
	return (
		<FooterWrapper>
			<FooterTop>
				<hr />
			</FooterTop>
			<FooterBottom>
				<FooterLeft>
					<Header>
						<Icon />
						<h1>Candleleaf</h1>
					</Header>
					<h4>Your natural candle made for your home and for your wellness.</h4>
				</FooterLeft>
				<FooterRight>
					<FooterColumn>
						<h4 className="header">Discovery</h4>
						<h4>New Season</h4>
						<h4>Most Searched</h4>
						<h4>Most Sold</h4>
					</FooterColumn>
					<FooterColumn>
						<h4 className="header">About</h4>
						<h4>Help</h4>
						<h4>Shipping</h4>
						<h4>Affiliate</h4>
					</FooterColumn>
					<FooterColumn>
						<h4 className="header">Info</h4>
						<h4>Contact Us</h4>
						<h4>Privacy Policies</h4>
						<h4>Terms & Conditions</h4>
					</FooterColumn>
				</FooterRight>
			</FooterBottom>
		</FooterWrapper>
	);
};

export default Footer;

const FooterWrapper = styled.div`
	width: 100%;
	background: #272727;
	color: white;
	display: flex;
	flex-direction: column;
	padding: 30px 0;
	scroll-snap-align: start;
`;

const FooterTop = styled.div`
	color: white;
`;
const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
	> h1 {
		margin-left: 10px;
	}
`;
const FooterBottom = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin: 35px 0px;
	@media ${devices.tablet} {
		flex-direction: column;
	}
`;

const FooterLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: start;
	align-items: flex-start;
	> h4 {
		margin-top: 15px;
		padding: 15px;
	}
`;

const FooterRight = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
`;

const FooterColumn = styled.div`
	display: flex;
	flex-direction: column;
	text-align: start;
	justify-content: space-between;
	align-items: flex-start;
	> h4 {
		cursor: pointer;
		margin: 15px;
		padding: 5px;
		transition: all 0.3s ease;
		:hover {
			transform: scale(1.1);
		}
		@media ${devices.mobileXL} {
			margin: 10px;
			padding: 3.5px;
		}
	}
	> h4.header {
		color: #49a010;
	}
`;
