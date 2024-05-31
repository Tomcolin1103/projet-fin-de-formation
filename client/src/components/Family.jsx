import { Box, Button, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Family() {
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
		</Box>
	);
}
