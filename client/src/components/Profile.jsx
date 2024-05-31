import { useRecoilState } from "recoil";
import { user } from "../api/user.api";
import { userState } from "../atoms/atom";
import { useEffect } from "react";
import { FormControl, Input, InputLabel } from "@mui/material";

export default function Profile() {
	const [userProfile, setUserProfile] = useRecoilState(userState);

	const getProfile = async (userId) => {
		try {
			const userProfileData = await user.getById(userId);
			setUserProfile(userProfileData);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		const userId = localStorage.getItem("user");
		if (userId && !userProfile.username) {
			getProfile(userId);
		}
	}, []);

	const handleChange = (e, field) => {
		setUserProfile((prevProfile) => ({
			...prevProfile,
			[field]: e.target.value,
		}));
	};

	return (
		<div>
			<form action="">
				<FormControl>
					<InputLabel htmlFor="usernameLabel">Username</InputLabel>
					<Input
						id="usernameLabel"
						required
						value={userProfile.username || ""}
						onChange={(e) => handleChange(e, "username")}
						sx={{ m: 3 }}
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor="firstnameLabel">Firstname</InputLabel>
					<Input
						id="firstnameLabel"
						required
						value={userProfile?.firstname || ""}
						onChange={(e) => handleChange(e, "firstname")}
						sx={{ m: 3 }}
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor="lastnameLabel">Lastname</InputLabel>
					<Input
						id="lastnameLabel"
						required
						value={userProfile?.lastname || ""}
						onChange={(e) => handleChange(e, "lastname")}
						sx={{ m: 3 }}
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor="passwordLabel">Password</InputLabel>
					<Input
						id="passwordLabel"
						required
						value={userProfile?.password || ""}
						onChange={(e) => handleChange(e, "password")}
						sx={{ m: 3 }}
					/>
				</FormControl>
			</form>
		</div>
	);
}
