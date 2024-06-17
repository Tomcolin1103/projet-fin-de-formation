import { Button, Input } from "@mui/material";
import { shoppingList } from "../api/shoppingList.api";
import { useParams } from "react-router-dom";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { triggerRerenderShoppingList } from "../atoms/atom";

export default function NewShoppingList() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [shoppingListName, setShoppingListName] = useState("");
	const [trigger, setTrigger] = useRecoilState(triggerRerenderShoppingList);

	const handleSubmit = (e) => {
		e.preventDefault();
		shoppingList.createShoppingList(shoppingListName, id);
		setTrigger((prev) => prev + 1);
		navigate(`/family/${id}/`);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Input
					type="text"
					placeholder="Shopping List Name"
					name="name"
					onChange={(e) => setShoppingListName(e.target.value)}
				></Input>
				<Button type="submit" variant="outlined">
					+ Create{" "}
				</Button>
			</form>
		</div>
	);
}
