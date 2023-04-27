import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import { RecipeProvider } from "./state/RecipeContext";


export default function App() {
	return (
		<div>
			<nav>
				<ul>
					{/* <li><Link to="/">Home</Link></li>
					<li><Link to="/recipes">Recipes</Link></li> */}
				</ul>
			</nav>
			<main>
				<RecipeProvider>
					<RecipeList />
				</RecipeProvider>
			</main>
		</div>
	)
}
