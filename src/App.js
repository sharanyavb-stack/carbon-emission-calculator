import React from "react";
import TableDemo from "./TableDemo";
import './App.css'
function App() {
	return (
		<div>
			{/* Header with inline css */}
			<h1 className="headerClass">
				Carbon Emission Calculator
			</h1>
			{/* Table component below header */}
			<TableDemo />
		</div>
	)
}

export default App;
