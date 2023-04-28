import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import RecipeSearch from "./components/RecipeSearch";
import { RecipeProvider } from "./state/RecipeContext";

export default function App() {
	return (
		<BrowserRouter>
			<div>
				<Navbar />
				<main>
					<RecipeProvider>
						<RecipeSearch />
						<Routes>
							<Route path="/" element={<div>Home Page</div>} />
							<Route path="/recipes" element={<div><RecipeForm /><RecipeList /></div>} />
							<Route path="/recipe/search" element={<RecipeList />} />
							<Route path="/recipe/:id" element={<RecipeDetail />} />
						</Routes>
					</RecipeProvider>
				</main>
			</div>
		</BrowserRouter>
	);
}