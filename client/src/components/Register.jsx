import { useRecoilState } from "recoil";
import { newUserState } from "../atoms/atom";
import { useEffect, useState } from "react";
import { Alert, Button, FormControl, Input } from "@mui/material";
import { user } from "../api/user.api";

export default function Register() {
	// eslint-disable-next-line no-unused-vars
	const [newUser, setNewUser] = useRecoilState(newUserState);
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [password, setPassword] = useState("");
	const [isRegistered, setIsRegistered] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();

		setNewUser({
			username: username,
			firstname: firstname,
			lastname: lastname,
			password: password,
		});
		setIsRegistered(true);
		setUsername("");
		setFirstname("");
		setLastname("");
		setPassword("");
	};

	useEffect(() => {
		if (
			newUser.username !== "" &&
			newUser.firstname !== "" &&
			newUser.lastname !== "" &&
			newUser.password !== ""
		) {
			user.register(newUser);
		}
	}, [newUser]);

	return (
		<div>
			<form onSubmit={onSubmit}>
				<FormControl>
					<Input
						required
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="username"
						sx={{ m: 3 }}
					/>
				</FormControl>
				<FormControl>
					<Input
						required
						type="text"
						name="firstname"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						placeholder="Firstname"
						sx={{ m: 3 }}
					/>
				</FormControl>
				<FormControl>
					<Input
						type="text"
						name="lastname"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						placeholder="Lastname"
						sx={{ m: 3 }}
					/>
				</FormControl>
				<FormControl>
					<Input
						required
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						sx={{ m: 3 }}
					/>
				</FormControl>
				<FormControl>
					<Button variant="outlined" type="submit" sx={{ m: 3 }}>
						Register
					</Button>
				</FormControl>
			</form>
			{isRegistered ? <Alert severity="success">Registered !</Alert> : <p></p>}
		</div>
	);
}
