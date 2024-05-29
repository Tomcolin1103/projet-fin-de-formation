import {
	Box,
	Button,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
	const navigationItem = ["Home", "Login", "Register"];
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const DrawerList = (
		<Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
			<List>
				{navigationItem.map((text, index) => (
					<Link to={"/" + text.toLowerCase()} key={index}>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</Box>
	);

	return (
		<div className="text-center">
			<Button onClick={toggleDrawer(true)}>Open menu</Button>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	);
}
