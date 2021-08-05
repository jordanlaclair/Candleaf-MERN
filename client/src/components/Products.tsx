import React, { useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";

import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/reducers";
import * as action from "../store/actions/index";
import { FC } from "react";
const Products: FC = () => {
	interface PostsSchema {
		title: string;
		message: string;
		tags: [string];
		image: string;

		price: number;
		purchaseCount: {
			type: number;
			default: 0;
		};
		createdAt: {
			type: Date;
			default: Date;
		};
		_id: string;
		__v: {
			type: number;
			default: 0;
		};
	}

	const candles: Array<PostsSchema> = useSelector(
		(state: State) => state.candles
	);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(action.getCandles());
	}, []);

	useEffect(() => {
		console.log(candles);
	}, [candles]);

	return (
		<ProductsWrapper id="products">
			<Header>
				<h1>Products</h1>
				<h2>Order it for you or for a loved one!</h2>
			</Header>
			<TableWrapper>
				{candles.map((candle) => {
					return (
						<Product
							title={candle.title}
							price={candle.price}
							image={candle.image}
							productId={candle._id}
						/>
					);
				})}
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
	margin-bottom: 3rem;
`;
