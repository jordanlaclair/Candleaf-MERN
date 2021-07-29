import React from "react";
import styled from "styled-components";
import Product from "./Product";
const Products = () => {
	return (
		<ProductsWrapper id="products">
			<Header>
				<h1>Products</h1>
				<h2>Order it for you or for a loved one!</h2>
			</Header>
			<TableWrapper>
				<Product name="Sweet Strawberry" price={4.99} />
				<Product name="Sweet Strawberry" price={4.99} />
				<Product name="Sweet Strawberry" price={4.99} />
				<Product name="Sweet Strawberry" price={4.99} />
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
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-gap: 2rem;
`;

const Header = styled.div`
	margin-bottom: 3rem;
`;
