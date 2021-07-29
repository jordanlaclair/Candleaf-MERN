import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ProductDetails = () => {
	const { id }: DataTypes = useParams();

	interface DataTypes {
		id: string;
	}

	return <ProductDetailsWrapper>Product Details {id}</ProductDetailsWrapper>;
};

export default ProductDetails;

const ProductDetailsWrapper = styled.div``;
