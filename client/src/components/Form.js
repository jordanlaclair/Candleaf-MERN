import React from "react";

function Form() {
	return (
		<form action="/action_page.php">
			<label for="fname">Title:</label>

			<input type="text" name="title" />
			<br />
			<label for="lname">Message:</label>

			<input type="text" name="message" />
			<br />
			<label for="lname">Creator:</label>

			<input type="text" name="creator" />

			<br />
			<label for="lname">selectedFile:</label>

			<input type="text" name="selectedFile" />

			<br />
			<label for="lname">Tags:</label>

			<input type="text" name="tags" />
			<br />

			<input type="submit" value="Submit" />
		</form>
	);
}

export default Form;
