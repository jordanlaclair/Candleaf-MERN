import React from "react";
import styled from "styled-components";
import Product from "./Product";
const Products = () => {
	return (
		<ProductsWrapper>
			<h1>Products</h1>
			<h2>Order it for you or for a loved one!</h2>
			<TableWrapper>
				<Product />
				<Product />
				<Product />
			</TableWrapper>
		</ProductsWrapper>
	);
};

export default Products;

const ProductsWrapper = styled.div`
	width: 100%;
	margin: 80px 0;
	background: whitesmoke;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> h2 {
		color: gray;
	}
`;

const TableWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
	grid-gap: 2rem;
`;
