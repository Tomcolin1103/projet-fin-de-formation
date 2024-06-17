import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import { user } from "../api/user.api";

export default function JoinFamily() {
	const [familyIdToJoin, setFamilyIdToJoin] = useState(0);

	const handleSubmit = () => {
		const userId = localStorage.getItem("user");
		user.joinFamily(userId, familyIdToJoin);
	};

	return (
		<Box display="flex" justifyContent="center">
			<form onSubmit={handleSubmit}>
				<FormControl>
					<InputLabel htmlFor="familyId">Family Id</InputLabel>
					<Input
						required
						sx={{ m: 3 }}
						id="familyId"
						onChange={(e) => setFamilyIdToJoin(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<Button variant="contained" type="submit">
						Join
					</Button>
				</FormControl>
			</form>
		</Box>
	);
}
