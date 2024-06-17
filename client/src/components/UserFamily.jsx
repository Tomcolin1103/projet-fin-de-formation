import {
	Box,
	Button,
	Card,
	CircularProgress,
	Stack,
	Typography,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { family } from "../api/family.api";
import { useEffect, useState } from "react";
import { user } from "../api/user.api";
import { redirect } from "react-router-dom";

export default function UserFamily() {
	const [userFamily, setUserFamily] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isDelete, setIsDelete] = useState(false);

	const userId = localStorage.getItem("user");
	const getUserFamily = async () => {
		if (userId) {
			try {
				const userFamilyData = await family.getUserFamily(userId);
				if (userFamilyData) {
					setUserFamily(userFamilyData);
				}
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		}
	};

	if (isDelete) {
		redirect("/");
	}

	useEffect(() => {
		getUserFamily();
	}, [userId, isDelete]);

	if (loading) {
		return <CircularProgress />;
	}

	function Divider() {
		return (
			<Box display="flex" className="items-center flex-col">
				{userFamily.map((userFam, index) => (
					<Card variant="outlined" sx={{ m: 3 }} className="w-1/2" key={index}>
						<Box sx={{ p: 2 }}>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
							>
								<Link to={`${userFam.familyId}`}>
									<Typography variant="h5" className="hover:text-cyan-700">
										{userFam.familyName}
									</Typography>
								</Link>
								<Button
									variant="contained"
									color="error"
									id={index}
									onClick={() =>
										user.leaveFamily(userId, userFam.familyId) &&
										setIsDelete(true)
									}
								>
									X
								</Button>
							</Stack>
						</Box>
					</Card>
				))}
			</Box>
		);
	}

	return (
		<Box alignItems="center">
			<Typography variant="h3">Family</Typography>
			<Box alignItems="center" sx={{ m: 1 }}>
				<Link to={"joinFamily"}>
					<Button color="secondary" variant="contained" sx={{ m: 3 }}>
						Join Family
					</Button>
				</Link>
				<Link to={"newFamily"}>
					<Button color="success" variant="contained" sx={{ m: 3 }}>
						+ Create Family
					</Button>
				</Link>
			</Box>
			<Outlet />
			<Divider />
		</Box>
	);
}
