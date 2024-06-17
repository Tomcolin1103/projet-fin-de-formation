import { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { family as familyCall } from "../api/family.api";
import { shoppingList } from "../api/shoppingList.api";
import { familyDetailState, triggerRerenderShoppingList } from "../atoms/atom";
import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Typography,
	Container,
} from "@mui/material";
import "tailwindcss/tailwind.css";

export default function FamilyDetail() {
	const [family, setFamily] = useRecoilState(familyDetailState);
	const [shoppingLists, setShoppingLists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [trigger, setTrigger] = useRecoilState(triggerRerenderShoppingList);
	const { id } = useParams();

	const getFamilyDetail = async (familyId) => {
		try {
			const familyData = await familyCall.getFamilyDetail(familyId);
			setFamily(familyData);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const getShoppingList = async (familyId) => {
		try {
			const shoppingListData = await shoppingList.getShoppingListByFamilyId(
				familyId
			);
			setShoppingLists(shoppingListData);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getFamilyDetail(id);
		getShoppingList(id);
	}, [id, trigger]);

	if (loading) {
		return <CircularProgress className="m-auto mt-10" />;
	}

	return (
		<Container maxWidth="md" className="mt-10">
			<Box className="text-center mb-6">
				<Typography variant="h3" className="font-bold">
					{family.familyName} : #{family.familyId}
				</Typography>
				<Link to="newShoppingList">
					<Button variant="contained" className="mt-4">
						+ New Shopping List
					</Button>
				</Link>
			</Box>
			<Outlet />
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{shoppingLists.map((shoppingListData, index) => (
					<Card key={index} className="hover:bg-cyan-50 shadow-md">
						<Box className="flex justify-between items-center p-4">
							<Link to={`${shoppingListData.shoppingListId}`}>
								<CardContent>
									<Typography color="text.secondary">
										{shoppingListData.name}
									</Typography>
								</CardContent>
							</Link>
							<Button
								variant="contained"
								color="error"
								onClick={() => {
									shoppingList.deleteShoppingList(
										shoppingListData.familyId,
										shoppingListData.shoppingListId
									);
									setTrigger((prev) => prev + 1);
								}}
							>
								X
							</Button>
						</Box>
					</Card>
				))}
			</div>
		</Container>
	);
}
