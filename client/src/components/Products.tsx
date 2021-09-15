import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/reducers";
import * as action from "../store/actions/index";
import { FC } from "react";
import { CandlesArray } from "../store/actions/index";
import Rellax from "rellax";

interface ProductsPropTypes {
	newCandles: CandlesArray;
}

const Products: FC<ProductsPropTypes> = ({ newCandles }) => {
	const filter = useSelector((state: State) => state.user.filter);

	const dispatch = useDispatch();
	interface CandleSchema {
		title: string;
		message: string;
		tags: Array<string>;
		purchaseCount: number;
		createdAt: {
			type: Date;
			default: Date;
		};
		_id: string;
		__v: {
			type: number;
			default: 0;
		};
		burningTime: string;
		dimensions: string;
		fragrance: string;
		image: string;
		wax: string;
		weight: string;
		price: number;
	}
	const candles: Array<CandleSchema> = useSelector(
		(state: State) => state.candles
	);
	useEffect(() => {
		new Rellax(".animate1", {
			speed: 2,
			center: false,
			round: true,
			vertical: true,
			horizontal: false,
		});

		new Rellax(".animate2", {
			speed: 1,
			center: false,
			round: true,
			vertical: true,
			horizontal: false,
		});

		if (candles.length === 0) dispatch(action.getCandles());
	}, []);

	const stringWeightToInt = (weight: string) => {
		return parseInt(weight.replace("g", ""), 10);
	};

	return (
		<ProductsWrapper id="products" className="animate1">
			<Header className="animate2">
				<h1>Products</h1>
				<h2>Order for you or for a loved one!</h2>
			</Header>
			<TableWrapper>
				{newCandles.length > 2
					? candles.map((candle) => {
							return (
								<Product
									title={candle.title}
									price={candle.price}
									key={uuidv4()}
									image={candle.image}
									productId={candle._id}
									productQuantity={candle.purchaseCount}
									showQuantity={false}
									showAddToCart={true}
									productWeight={stringWeightToInt(candle.weight)}
								/>
							);
					  })
					: null}
			</TableWrapper>
		</ProductsWrapper>
	);
};

export default Products;

const ProductsWrapper = styled.div`
	width: 100%;
	margin: 80px 0;
	scroll-margin-top: 8rem;
	background: ${(props) => props.theme.colors.primary};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;

	> h2 {
		color: gray;
	}
`;

const TableWrapper = styled.div`
	width: 70%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	grid-gap: 2rem;
`;

const Header = styled.div`
	margin-top: 2rem;

	padding: 4rem 0;
`;
