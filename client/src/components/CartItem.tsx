import React from "react";
import styled from "styled-components";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/actions/index";
import { State } from "../store/reducers";
import devices from "../styles/devices";
type PropTypes = {
	productName: string;
	productId: string;
	totalPrice: number;
	productWeight: number;
	productQuantity: number;
	id: string;
	price: number;
};
interface ProductSchema {
	productName: string;
	price: number;
	productWeight: number;
	productId: string;
}

const CartItem: FC<PropTypes> = ({
	productName,
	productId,
	totalPrice,
	productWeight = 0,
	productQuantity,
	price,
}) => {
	const dispatch = useDispatch();
	const user = useSelector((state: State) => state.user);
	const candles = useSelector((state: State) => state.candles);

	const handleAddToCart = (
		productName: string,
		price: number,
		productId: string,
		productWeight: number
	) => {
		let order: ProductSchema = {
			productName,
			price,
			productWeight,
			productId,
		};

		dispatch(action.addToCart(user._id, order));
	};

	const handleRemoveFromCart = (productId: string, userId: string) => {
		dispatch(action.removeFromCart(productId, userId));
	};

	const handleLowerQuantity = (productId: string, userId: string) => {
		dispatch(action.lowerQuantity(productId, userId));
	};

	const handleGetImage = () => {
		return candles.map((candle) => {
			if (candle._id == productId) {
				return <img src={candle.image} alt="Candleaf candle" />;
			}
		});
	};

	return (
		<Wrapper>
			<SectionWrapper>
				<SectionProductTitle>Product</SectionProductTitle>
				<SectionImageWrapper>
					<SectionTitleRemove>
						<h3>{productName}</h3>
						<h4
							onClick={() => {
								handleRemoveFromCart(productId, user._id);
							}}
						>
							Remove
						</h4>
					</SectionTitleRemove>
					<ImageWrapper>{handleGetImage()}</ImageWrapper>
				</SectionImageWrapper>
			</SectionWrapper>
			<SectionWrapper>
				<SectionTitle>Price</SectionTitle>
				<SectionPrice>${price}</SectionPrice>
			</SectionWrapper>
			<SectionWrapper>
				<SectionTitle>Quantity</SectionTitle>
				<QuantityWrapper>
					<IndeterminateCheckBoxIcon
						onClick={() => {
							handleLowerQuantity(productId, user._id);
						}}
					/>
					<h3>{productQuantity}</h3>
					<AddBoxIcon
						onClick={() => {
							handleAddToCart(productName, price, productId, productWeight);
						}}
					/>
				</QuantityWrapper>
			</SectionWrapper>
			<SectionWrapper>
				<SectionTitle>Total</SectionTitle>
				<SectionTotalPrice>
					${Math.round(totalPrice * 100) / 100}
				</SectionTotalPrice>
			</SectionWrapper>
		</Wrapper>
	);
};

export default CartItem;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: flex-start;
	border-top: solid 1px ${(props) => props.theme.colors.opposite};
	width: 80%;
	@media ${devices.tablet} {
		flex-direction: column;
		align-items: center;
	}
`;

const SectionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	padding: 30px 0px;
	width: 100%;
	flex: 1;
	@media ${devices.tablet} {
		align-items: center;
	}
`;

const SectionTitle = styled.h3`
	margin-bottom: 20px;
`;
const SectionProductTitle = styled.h3`
	text-align: start;

	margin-left: 20px;
	margin-bottom: 20px;
`;

const SectionPrice = styled.h3`
	font-weight: bold;
`;
const SectionTotalPrice = styled.h3`
	font-weight: bold;
`;
const SectionImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	@media ${devices.tablet} {
		width: 100%;
		justify-content: space-evenly;
	}
`;
const QuantityWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	.MuiSvgIcon-root {
		cursor: pointer;
		padding: 0px 5px;
	}
`;
const ImageWrapper = styled.div`
	justify-self: flex-start;
	width: 150px;

	> img {
		width: 100%;
		height: auto;
	}
`;

const SectionTitleRemove = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> h4 {
		margin-top: 5px;
		font-size: 15px;
		font-weight: 900;
		display: flex;
		letter-spacing: 0.8px;
		text-transform: capitalize;
		justify-content: center;
		align-items: center;
		color: black;
		background-color: ${(props) => props.theme.brand};
		border-radius: 99px;
		padding: 4px 10px;
	}
`;
