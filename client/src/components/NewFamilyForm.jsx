import {
	Alert,
	Box,
	Button,
	FormControl,
	Input,
	InputLabel,
} from "@mui/material";
import { family } from "../api/family.api";
import { useState } from "react";

export default function NewFamilyForm() {
	const [familyName, setFamilyName] = useState("");
	const [isCreated, setIsCreated] = useState(false);
	const [familyData, setFamilyData] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await family.createFamily(familyName);
			console.log(data);
			setFamilyData(data);
			setIsCreated(true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box display="flex" justifyContent="center">
			<form className="flex flex-col w-1/3" onSubmit={handleSubmit}>
				<FormControl>
					<InputLabel htmlFor="familyName">Family Name</InputLabel>
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
			{isCreated && familyData && (
				<Alert severity="success">
					Family Created ! ID : {familyData.familyId}
					<br />
					Keep this ID to join this family
				</Alert>
			)}
		</Box>
	);
}
