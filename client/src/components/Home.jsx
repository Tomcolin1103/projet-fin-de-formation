import { Typography, Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<Container maxWidth="lg" sx={{ mt: 5 }}>
			<Box
				sx={{
					textAlign: "center",
					p: 5,
					backgroundColor: "primary.main",
					color: "white",
					borderRadius: 2,
				}}
			>
				<Typography variant="h3" gutterBottom>
					Family Shopping List
				</Typography>
				<Typography variant="h6" paragraph>
					This is an application for creating shared shopping lists.
				</Typography>
				<Typography variant="h6" paragraph>
					To do this, simply register and then go to the Family tab, where you
					can join or create a family.
				</Typography>
				<Link to={"/register"}>
					<Button
						variant="contained"
						color="secondary"
						size="large"
						sx={{ mt: 3 }}
					>
						Get Started
					</Button>
				</Link>
			</Box>
		</Container>
	);
}
