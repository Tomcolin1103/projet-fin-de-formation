import { useRecoilState } from "recoil";
import { user } from "../api/user.api";
import { userState } from "../atoms/atom";
import { useEffect, useState } from "react";
import { Alert, Button, FormControl, Input, InputLabel } from "@mui/material";

export default function Profile() {
	const [userProfile, setUserProfile] = useRecoilState(userState);
	const [username, setUserName] = useState(userProfile.username);
	const [isUpdated, setIsUpdated] = useState(false);

	const getProfile = async (userId) => {
		try {
			const userProfileData = await user.getById(userId);
			setUserProfile(userProfileData);
		} catch (e) {
			console.error(e);
		}
	};

	const handleUpdateUsername = async (e) => {
		e.preventDefault();
		const userId = localStorage.getItem("user");
		try {
			await user.updateUser(userId, username);
			setIsUpdated(true);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const userId = localStorage.getItem("user");
		if (userId && !userProfile.username) {
			getProfile(userId);
		}
	}, []);

	const Congrat = () => {
		return <Alert severity="success">Profile Updated</Alert>;
	};

	return (
		<div>
			<form onSubmit={handleUpdateUsername}>
				<FormControl>
					<InputLabel htmlFor="usernameLabel">Username</InputLabel>
					<Input
						id="usernameLabel"
						required
						value={username}
						onChange={(e) => setUserName(e.target.value)}
						sx={{ m: 3 }}
					/>
					<Button variant="contained" color="secondary" type="submit">
						Change username
					</Button>
				</FormControl>
			</form>
			{isUpdated && <Congrat />}
		</div>
	);
}
