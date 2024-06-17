import {
	Box,
	Button,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoggedState, userState } from "../atoms/atom";
import { user } from "../api/user.api";
import { Outlet } from "react-router-dom";

export default function Navbar() {
	let navigationItem = ["Home", "Login", "Register"];
	const [isLogged, setIsLogged] = useRecoilState(isLoggedState);
	const [, setUserLogged] = useRecoilState(userState);

	useEffect(() => {
		if (localStorage.getItem("user")) {
			setIsLogged(true);
		}
	}, [setIsLogged]);

	if (isLogged) {
		navigationItem = navigationItem.filter(
			(navItem) => navItem !== "Login" && navItem !== "Register"
		);
	}

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

	const drawerWidth = 240;

	function PermanentDrawerLeft() {
		return (
			<Box sx={{ display: "flex" }}>
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}
					variant="permanent"
					anchor="left"
				>
					<Toolbar />
					<Divider />
					<List>
						{navigationItem.map((text, index) => (
							<ListItem disablePadding key={index}>
								<ListItemButton component={Link} to={"/" + text.toLowerCase()}>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
						{isLogged && (
							<>
								<ListItem disablePadding>
									<ListItemButton component={Link} to="/profile">
										<ListItemText primary="Profile" />
									</ListItemButton>
								</ListItem>
								<ListItem disablePadding>
									<ListItemButton component={Link} to="/family">
										<ListItemText primary="Family" />
									</ListItemButton>
								</ListItem>
							</>
						)}
						{isLogged && (
							<ListItem disablePadding>
								<ListItemButton>
									<Button
										variant="outlined"
										color="error"
										onClick={onClickLogout}
									>
										Logout
									</Button>
								</ListItemButton>
							</ListItem>
						)}
					</List>
				</Drawer>
				<Box
					component="main"
					sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
				>
					<Toolbar />
					<Outlet />
				</Box>
			</Box>
		);
	}

	return (
		<div className="text-center">
			<PermanentDrawerLeft />
		</div>
	);
}
