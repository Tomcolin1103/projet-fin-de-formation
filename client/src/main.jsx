import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import { RecoilRoot } from "recoil";
import Register from "./components/Register.jsx";
import Profile from "./components/Profile.jsx";

import NewFamilyForm from "./components/NewFamilyForm.jsx";
import JoinFamily from "./components/JoinFamily.jsx";
import UserFamily from "./components/UserFamily.jsx";
import FamilyDetail from "./components/FamilyDetail.jsx";
import ShoppingList from "./components/ShoppingList.jsx";
import NewShoppingList from "./components/NewShoppingList.jsx";
import NewItem from "./components/NewItem.jsx";
import Home from "./components/Home.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: "/family",
				element: <UserFamily />,
				children: [
					{
						path: "/family/newFamily",
						element: <NewFamilyForm />,
					},
					{
						path: "/family/joinFamily",
						element: <JoinFamily />,
					},
				],
			},
			{
				path: "/family/:id",
				element: <FamilyDetail />,
				children: [
					{
						path: "/family/:id/newShoppingList",
						element: <NewShoppingList />,
					},
				],
			},
			{
				path: "/family/:id/:listId",
				element: <ShoppingList />,
				children: [
					{
						path: "/family/:id/:listId/newItem",
						element: <NewItem />,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RecoilRoot>
			<RouterProvider router={router}>
				<App />
			</RouterProvider>
		</RecoilRoot>
	</React.StrictMode>
);
