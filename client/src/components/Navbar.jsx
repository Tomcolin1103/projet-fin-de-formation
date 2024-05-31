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

import { useRecoilState } from "recoil";
import { isLoggedState, userState } from "../atoms/atom";
import { user } from "../api/user.api";
import { Outlet } from "react-router-dom";

export default function Navbar() {
	const navigationItem = ["Home", "Login", "Register"];
	const [isLogged, setIsLogged] = useRecoilState(isLoggedState);
	const [, setUserLogged] = useRecoilState(userState);

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

	function PermamentDrawerLeft() {
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
						{isLogged ? (
							<Link to={"/family"}>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemText primary={"Family"}></ListItemText>
									</ListItemButton>
								</ListItem>
							</Link>
						) : null}
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
			<PermamentDrawerLeft></PermamentDrawerLeft>
		</div>
	);
}
