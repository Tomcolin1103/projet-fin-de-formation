import { Button } from "../ui/button";

export default function Login() {
	return (
		<div>
			<form action="">
				<input type="text" name="username" placeholder="username" />
				<input type="password" name="password" placeholder="password" />
				<Button>Login</Button>
			</form>
		</div>
	);
}
