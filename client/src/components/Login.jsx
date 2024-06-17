import { useState } from "react";
import {
	Button,
	TextField,
	Typography,
	Container,
	Box,
	Alert,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { user } from "../api/user.api";
import { isLoggedState, userState } from "../atoms/atom";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [, setIsLogged] = useRecoilState(isLoggedState);
	const [, setUserLogged] = useRecoilState(userState);
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setUsernameError(false);
		setPasswordError(false);
		setErrorMessage("");

		if (username === "") {
			setUsernameError(true);
		}
		if (password === "") {
			setPasswordError(true);
		}
		if (username !== "" && password !== "") {
			try {
				await user.login(username, password);
				setIsLogged(true);
				setUserLogged({ username });
				navigate("/family");
			} catch (error) {
				setErrorMessage("Invalid username or password");
			}
		}
	};

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						error={usernameError}
						helperText={usernameError && "Username is required"}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={passwordError}
						helperText={passwordError && "Password is required"}
					/>
					{errorMessage && (
						<Alert severity="error" sx={{ width: "100%" }}>
							{errorMessage}
						</Alert>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={{ mt: 3, mb: 2 }}
					>
						Login
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
