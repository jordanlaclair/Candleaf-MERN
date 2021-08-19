import React, { useRef, useState } from "react";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

interface PropTypes {
	fieldName: string;
	fieldData: string;
	shipping?: boolean;
}
const UserInfoField: FC<PropTypes> = ({ fieldName, fieldData, shipping }) => {
	const history = useHistory();
	const [editClicked, setEditClicked] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const toggleEditClick = () => {
		inputRef.current?.focus();
		setEditClicked(true);
	};
	const toggleShippingEditClick = () => {
		history.push("/checkout/shipping");
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setEditClicked(false);
	};

	const handleDefaultValue = () => {
		if (shipping == true) {
			return `${fieldData} Shipping`;
		} else {
			return fieldData;
		}
	};
	return (
		<UserInputField>
			<UserInputLeftFields>
				<FieldHeader>{fieldName}</FieldHeader>
				<Form onSubmit={handleSubmit}>
					<FieldInput
						ref={inputRef}
						defaultValue={handleDefaultValue()}
						disabled={!editClicked}
					/>
				</Form>
			</UserInputLeftFields>
			<UserInputRightField
				onClick={shipping ? toggleShippingEditClick : toggleEditClick}
			>
				<h4>Edit</h4>
			</UserInputRightField>
		</UserInputField>
	);
};

export default UserInfoField;

const FieldHeader = styled.h4`
	text-align: start;
	min-width: 80px;
	opacity: 0.8;
`;
const FieldInput = styled.input`
	outline: none;
	border: none;
	width: 90%;
	font-family: "Poppins", sans-serif;
	:disabled {
		background: initial;
		color: ${(props) => props.theme.text};
		font-weight: 700;
	}
	:not([disabled]),
	select:not([disabled]) {
		outline: none;
		border: none;
		background: initial;
		color: ${(props) => props.theme.text};
		font-weight: 700;
	}
`;
const UserInputField = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const UserInputLeftFields = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const UserInputRightField = styled.div`
	color: ${(props) => props.theme.brand};
	cursor: pointer;
	transition: all 1s step-start;
	:hover {
		transform: scale(1.2);
	}
	text-align: end;
`;

const Form = styled.form`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
`;
