import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { newUserState } from "../atoms/atom";
import {
	Alert,
	Button,
	FormControl,
	Input,
	InputLabel,
	Box,
	Typography,
	Container,
} from "@mui/material";
import { user } from "../api/user.api";
import "tailwindcss/tailwind.css";

export default function Register() {
	const [newUser, setNewUser] = useRecoilState(newUserState);
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [password, setPassword] = useState("");
	const [isRegistered, setIsRegistered] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		setNewUser({ username, firstname, lastname, password });
		setIsRegistered(true);
		setUsername("");
		setFirstname("");
		setLastname("");
		setPassword("");
	};

	useEffect(() => {
		if (
			newUser.username &&
			newUser.firstname &&
			newUser.lastname &&
			newUser.password
		) {
			user.register(newUser);
		}
	}, [newUser]);

	return (
		<Container maxWidth="sm">
			<Box className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10">
				<Typography variant="h4" className="text-center mb-4">
					Register
				</Typography>
				<form onSubmit={onSubmit} className="space-y-4">
					<FormControl fullWidth>
						<InputLabel htmlFor="username">Username</InputLabel>
						<Input
							id="username"
							required
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Username"
						/>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel htmlFor="firstname">First Name</InputLabel>
						<Input
							id="firstname"
							required
							type="text"
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							placeholder="First Name"
						/>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel htmlFor="lastname">Last Name</InputLabel>
						<Input
							id="lastname"
							required
							type="text"
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
							placeholder="Last Name"
						/>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							id="password"
							required
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>
					</FormControl>
					<FormControl fullWidth>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							className="w-full mt-4"
						>
							Register
						</Button>
					</FormControl>
				</form>
				{isRegistered && (
					<Alert severity="success" className="mt-4">
						Registered!
					</Alert>
				)}
			</Box>
		</Container>
	);
}
