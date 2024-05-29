import { useRecoilState } from "recoil";
import { nameState } from "../atoms/atom";

export default function Register() {
	const [name, setName] = useRecoilState(nameState);

	const onChange = (e) => {
		setName(e.target.value);
	};

	return (
		<div>
			<input type="text" value={name} onChange={onChange} placeholder="name" />
			<br />
			{name}
		</div>
	);
}
