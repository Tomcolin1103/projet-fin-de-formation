import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { family } from "../api/family.api";
import { useState } from "react";

export default function NewFamilyForm() {
	const [familyName, setFamilyName] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(familyName);
		family.createFamily(familyName);
	};

	return (
		<Box display="flex" justifyContent="center">
			<form className="flex flex-col w-1/3" onSubmit={handleSubmit}>
				<FormControl>
					<InputLabel htmlFor="familyNameForm">Family Name</InputLabel>
					<Input
						required
						sx={{ m: 3 }}
						id="familyName"
						onChange={(e) => setFamilyName(e.target.value)}
					/>
				</FormControl>
				<FormControl className="items-center">
					<Button
						variant="contained"
						color="success"
						type="submit"
						className="w-1/3"
					>
						+ Create Family
					</Button>
				</FormControl>
			</form>
		</Box>
	);
}
