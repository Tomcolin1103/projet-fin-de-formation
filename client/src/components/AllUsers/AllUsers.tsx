import axios from "axios";

export default function AllUsers() {
	const users = axios.get("http://localhost:3000/api/users/").then((res) => {
		console.log(res.data);
	});

	return <div>AllUsers</div>;
}
