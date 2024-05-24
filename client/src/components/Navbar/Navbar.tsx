import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="flex justify-between ">
			<h1 className="text-5xl text-white">Navbar</h1>
			<Link to={"/login"}>
				<Button className="loginButton text-white">Login</Button>
			</Link>
		</div>
	);
}
