import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		setUsernameError(false);
		setPasswordError(false);

		if (username === "") {
			setUsernameError(true);
		}
		if (password === "") {
			setPasswordError(true);
		}
		if (username && password) {
			console.log(username, password);
		}
	};

	return (
		<form autoComplete="off" onSubmit={handleSubmit}>
			<h2>Login Form</h2>
			<TextField
				label="Username"
				onChange={(e) => setUsername(e.target.value)}
				required
				variant="outlined"
				value={username}
				error={usernameError}
				sx={{ m: 3 }}
			/>
			<TextField
				label="Password"
				onChange={(e) => setPassword(e.target.value)}
				required
				variant="outlined"
				value={password}
				error={passwordError}
				sx={{ m: 3 }}
				type="password"
			/>
			<Button variant="outlined" type="submit">
				Login
			</Button>
		</form>
	);
}
