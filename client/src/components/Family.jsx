import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { family } from "../api/family.api";
import { useEffect, useState } from "react";

export default function Family() {
	const [userFamily, setUserFamily] = useState([]);
	const [loading, setLoading] = useState(true);

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

	useEffect(() => {
		getUserFamily();
	}, [userId]);

	if (loading) {
		return <Typography>Loading ...</Typography>;
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
								<Typography variant="h5">{userFam.familyName}</Typography>
								<Button
									variant="contained"
									color="error"
									id={index}
									onClick={() => console.log(userFam.familyId)}
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
				<Button color="secondary" variant="contained" sx={{ m: 3 }}>
					Join Family
				</Button>
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
