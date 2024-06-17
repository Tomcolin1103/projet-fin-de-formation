import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shoppingList } from "../api/shoppingList.api";
import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import itemsApiCall from "../api/items.api";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ShoppingList() {
	const [shoppingListDetail, setShoppingListDetail] = useState(null);
	const [shoppingLists, setShoppingLists] = useState([]);

	const { id, listId } = useParams();

	const getListDetail = async (familyId, listId) => {
		try {
			const listData = await shoppingList.shoppingListDetail(familyId, listId);
			setShoppingListDetail(listData);
		} catch (error) {
			console.error(error);
		}
	};

	const getShoppingLists = async (listId) => {
		try {
			if (listId) {
				const shoppingListsData = await itemsApiCall.getItemsByListId(listId);
				setShoppingLists(shoppingListsData);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (itemId) => {
		try {
			if (itemId) {
				await itemsApiCall.deleteItem(itemId);
				window.location.reload();
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getListDetail(id, listId);
		getShoppingLists(listId);
	}, []);

	const BasicTable = () => {
		return (
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Quantity</TableCell>
							<TableCell> </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{shoppingLists.map((item) => (
							<TableRow key={item.name}>
								<TableCell component="th" scope="row">
									{item.name}
								</TableCell>
								<TableCell>{item.quantity}</TableCell>
								<TableCell>
									<Button
										variant="contained"
										color="error"
										onClick={() => handleDelete(item.itemId)}
									>
										X
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	};

	return (
		<>
			<div>
				{shoppingListDetail ? (
					<Typography variant="h3">{shoppingListDetail.name}</Typography>
				) : (
					<Typography variant="h3">Loading...</Typography>
				)}
			</div>
			<Link to={"newItem"}>
				<Button variant="contained">Add New Item</Button>
			</Link>
			<Outlet />
			{shoppingLists && (
				<div className="w-1/2 m-auto">
					<BasicTable />
				</div>
			)}
		</>
	);
}
