import { FC, useEffect, useState } from "react";

const App: FC = () => {
	const [data, setData] = useState(null);
	useEffect(() => {
		const callBackendAPI = async () => {
			try {
				const response = await fetch("/api");
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const body = await response.json();
				setData(body.message);
			} catch (error) {
				console.error(error.message);
			}
		};
		callBackendAPI();
	}, []);
	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">Welcome to React</h1>
				<p>{data}</p>
			</header>
		</div>
	);
};

export default App;
