import { Button, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { user } from "../api/user.api";
import { isLoggedState, userState } from "../atoms/atom";
import { useRecoilState } from "recoil";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [login, setLogin] = useState(false);
	const [, setIsLogged] = useRecoilState(isLoggedState);
	const [userLogged, setUserLogged] = useRecoilState(userState);

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
		if (username !== "" && passwordError !== "") {
			setLogin(true);
		}
	};

	useEffect(() => {
		if (login) {
			setIsLogged(true);
			user.login(username, password);
		}
	}, [login, password, setIsLogged, setUserLogged, userLogged, username]);

	return (
		<form autoComplete="off" onSubmit={handleSubmit}>
			<Typography variant="h2">Login Form</Typography>
			<Input
				label="Username"
				onChange={(e) => setUsername(e.target.value)}
				required
				variant="outlined"
				placeholder="username"
				value={username}
				error={usernameError}
				sx={{ m: 3 }}
			/>
			<Input
				label="Password"
				onChange={(e) => setPassword(e.target.value)}
				required
				variant="outlined"
				placeholder="password"
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
