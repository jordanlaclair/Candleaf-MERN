import React from "react";
import { FC } from "react";
import styled from "styled-components";

const Order: FC = () => {
	return <OrderWrapper></OrderWrapper>;
};

export default Order;

const OrderWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
