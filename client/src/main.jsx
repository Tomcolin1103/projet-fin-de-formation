import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import { RecoilRoot } from "recoil";
import Register from "./components/Register.jsx";
import Profile from "./components/Profile.jsx";
import Family from "./components/Family.jsx";
import NewFamilyForm from "./components/NewFamilyForm.jsx";

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
				element: <div>Home</div>,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: "/family",
				element: <Family />,
				children: [
					{
						path: "/family/newFamily",
						element: <NewFamilyForm />,
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
