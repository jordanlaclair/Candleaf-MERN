import React, { useRef, useState } from "react";
import { FC } from "react";
import styled from "styled-components";

interface PropTypes {
	fieldName: string;
	fieldData: string;
}
const UserInfoField: FC<PropTypes> = ({ fieldName, fieldData }) => {
	const [editClicked, setEditClicked] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const toggleEditClick = () => {
		inputRef.current?.focus();
		setEditClicked(true);
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setEditClicked(false);
	};
	return (
		<UserInputField>
			<UserInputLeftFields>
				<FieldHeader>{fieldName}</FieldHeader>
				<Form onSubmit={handleSubmit}>
					<FieldInput
						ref={inputRef}
						defaultValue={fieldData}
						disabled={!editClicked}
					/>
				</Form>
			</UserInputLeftFields>
			<UserInputRightField onClick={toggleEditClick}>
				<h4>Edit</h4>
			</UserInputRightField>
		</UserInputField>
	);
};

export default UserInfoField;

const FieldHeader = styled.h4`
	margin-right: 10px;
`;
const FieldInput = styled.input`
	outline: none;
	border: none;
	min-width: 250px;
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
	display: flex;
	justify-content: center;
	align-items: center;
`;

const UserInputRightField = styled.div`
	color: ${(props) => props.theme.lightBrand};
	cursor: pointer;
	transition: all 1s step-start;
	:hover {
		transform: scale(1.2);
	}
	text-align: end;
`;

const Form = styled.form``;
