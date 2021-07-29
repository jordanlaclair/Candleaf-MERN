import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ProductDetails = () => {
	interface DataTypes {
		id: string;
	}
	const { id }: DataTypes = useParams();

	return <ProductDetailsWrapper>Product Details {id}</ProductDetailsWrapper>;
};

export default ProductDetails;

const ProductDetailsWrapper = styled.div``;
