import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import { RecipeProvider } from "./state/RecipeContext";

export default function App() {
	return (
		<BrowserRouter>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/recipes">Recipes</Link>
						</li>
					</ul>
				</nav>
				<main>
					<RecipeProvider>
						<Routes>
							<Route path="/" element={<div>Home Page</div>} />
							<Route path="/recipes" element={<div><RecipeList /><RecipeForm /></div>} />
							<Route path="/recipe/:id" element={<RecipeDetail />} />
						</Routes>
					</RecipeProvider>
				</main>
			</div>
		</BrowserRouter>
	);
}