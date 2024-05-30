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

import { useRecoilState } from "recoil";
import { isLoggedState, userState } from "../atoms/atom";
import { user } from "../api/user.api";

export default function Navbar() {
	const navigationItem = ["Home", "Login", "Register"];
	const [open, setOpen] = useState(false);
	const [isLogged, setIsLogged] = useRecoilState(isLoggedState);
	const [, setUserLogged] = useRecoilState(userState);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const onClickLogout = () => {
		user.logout();
		setIsLogged(false);
		setUserLogged({
			username: "",
			firstname: "",
			lastname: "",
			password: "",
		});
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
				{isLogged ? (
					<Link to={"/profile"}>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText primary={"Profile"}></ListItemText>
							</ListItemButton>
						</ListItem>
					</Link>
				) : null}
				<ListItem disablePadding>
					<ListItemButton>
						<Button variant="outlined" color="error" onClick={onClickLogout}>
							Logout
						</Button>
					</ListItemButton>
				</ListItem>
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
