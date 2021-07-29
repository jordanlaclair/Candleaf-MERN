import React from "react";
import styled from "styled-components";
import Product from "./Product";
import PurpleCandle from "../images/purple-candle.png";
import LavenderCandle from "../images/lavender-candle.png";
import YellowCandle from "../images/yellow-candle.png";
import BrownCandle from "../images/brown-candle.png";
import GreenCandle from "../images/green-candle.png";
import LightGreenCandle from "../images/lightgreen-candle.png";
import RedCandle from "../images/red-candle.png";
import PinkCandle from "../images/pink-candle.png";

const Products = () => {
	return (
		<ProductsWrapper id="products">
			<Header>
				<h1>Products</h1>
				<h2>Order it for you or for a loved one!</h2>
			</Header>
			<TableWrapper>
				<Product name="Summer Cherries" price={4.99} image={RedCandle} id={1} />
				<Product
					name="Sweet Strawberry"
					price={4.99}
					image={PinkCandle}
					id={2}
				/>
				<Product
					name="Juicy Lemon"
					price={4.99}
					image={LightGreenCandle}
					id={3}
				/>
				<Product
					name="Fragrant Cinnamon"
					price={4.99}
					image={BrownCandle}
					id={4}
				/>
				<Product name="Fresh Orange" price={4.99} image={YellowCandle} id={5} />
				<Product
					name="Clean Blueberries"
					price={4.99}
					image={LavenderCandle}
					id={6}
				/>
				<Product
					name="Clean Lavender"
					price={4.99}
					image={PurpleCandle}
					id={7}
				/>
				<Product name="Spiced Mint" price={4.99} image={GreenCandle} id={8} />
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
