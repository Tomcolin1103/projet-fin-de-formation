import { useState } from "react";
import { Button, Input, Container } from "@mui/material";
import itemsApiCall from "../api/items.api";
import { useParams } from "react-router-dom";

export default function NewItem() {
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState(0);
	const { listId } = useParams();

	const handleSubmit = () => {
		itemsApiCall.createItem(name, quantity, listId);
		setName("");
		setQuantity(0);
	};

	return (
		<Container maxWidth="sm" className="mt-10">
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				<div className="mb-4">
					<Input
						placeholder="Item Name"
						name="itemName"
						value={name}
						onChange={(e) => setName(e.target.value)}
						fullWidth
						className="py-2 px-4 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<Input
						type="number"
						min="1"
						placeholder="Quantity"
						name="quantity"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
						fullWidth
						className="py-2 px-4 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<Button
					variant="contained"
					color="success"
					type="submit"
					className="w-full"
				>
					+ Add Item
				</Button>
			</form>
		</Container>
	);
}
