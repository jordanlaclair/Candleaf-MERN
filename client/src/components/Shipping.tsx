import React, { useState } from "react";
import styled from "styled-components";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ReactComponent as Logo } from "../images/leaf.svg";
import { PurchaseOption } from "./ProductDetails";
import Radio from "@material-ui/core/Radio";

import {
	HeaderWrapper,
	CheckoutWrapper,
	FirstHalf,
	SecondHalf,
	Header,
	LogoWrapper,
	ImageWrapper,
	InputField,
	BreadCrumbs,
	PastBreadCrumb,
	HorizontalLine,
	CurrentBreadCrumb,
	LocationWrapper,
	NextBreadCrumb,
} from "./Checkout";

const Shipping = () => {
	const [shippingMethod, setShippingMethod] = useState("");

	const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShippingMethod(event.target.value);
	};

	return (
		<ShippingWrapper>
			<FirstHalf>
				<HeaderWrapper>
					<Header>
						<LogoWrapper>
							<ImageWrapper>
								<Logo />
							</ImageWrapper>

							<h2>Candleaf</h2>
						</LogoWrapper>
					</Header>
					<BreadCrumbs>
						<PastBreadCrumb>Cart</PastBreadCrumb>
						<NavigateNextIcon />
						<PastBreadCrumb>Details</PastBreadCrumb>
						<NavigateNextIcon />
						<CurrentBreadCrumb>Shipping</CurrentBreadCrumb>
						<NavigateNextIcon />
						<NextBreadCrumb>Payment</NextBreadCrumb>
					</BreadCrumbs>
				</HeaderWrapper>
				<InputFieldWrapper>
					<h3>Contact</h3>
					<InputFieldShipping />
				</InputFieldWrapper>
				<InputFieldWrapper>
					<h3>Ship To</h3>
					<InputFieldShipping />
				</InputFieldWrapper>
				<HorizontalLineShipping />
				<h2>Shipping Method</h2>
				<OptionWrapper>
					<PurchaseOption>
						<Radio
							checked={shippingMethod === "Standard"}
							onChange={handleShippingChange}
							value="Standard"
							color="default"
							name="radio-button-demo"
							inputProps={{ "aria-label": "Standard Shipping" }}
						/>
						<h4
							onClick={() => {
								setShippingMethod("Standard");
							}}
						>
							Standard Shipping
						</h4>
					</PurchaseOption>
					<h3>Free</h3>
				</OptionWrapper>
				<OptionWrapper>
					<PurchaseOption>
						<Radio
							checked={shippingMethod === "Expedited"}
							onChange={handleShippingChange}
							value="Expedited"
							color="default"
							name="radio-button-demo"
							inputProps={{ "aria-label": "Expedited Shipping" }}
						/>
						<h4
							onClick={() => {
								setShippingMethod("Expedited");
							}}
						>
							Expedited Shipping
						</h4>
					</PurchaseOption>
					<h3>$5.99</h3>
				</OptionWrapper>
			</FirstHalf>
		</ShippingWrapper>
	);
};

export default Shipping;

const ShippingWrapper = styled(HeaderWrapper)``;

const InputFieldShipping = styled(InputField)``;

const InputFieldWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin: 10px 0;
`;

const HorizontalLineShipping = styled(HorizontalLine)`
	margin: 3rem 0;
`;

const OptionWrapper = styled.div`
	padding: 3px 12px;
	display: flex;
	min-width: 350px;
	justify-content: space-between;
	align-items: center;
	background: transparent;
	border-radius: 7px;
	margin-top: 1rem;
	border: 1px solid ${(props) => props.theme.colors.opposite};
	> h3 {
		font-weight: bold;
		color: ${(props) => props.theme.brand};
	}
`;
