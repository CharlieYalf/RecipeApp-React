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
						<Routes>
							<Route path="/" element={<div>Home Page</div>} />
							<Route path="/recipes" element={<RecipeList />} />
							<Route path="/recipe/search" element={<div><RecipeSearch /><RecipeList /></div>} />
							<Route path="/recipe/:id" element={<RecipeDetail />} />
							<Route path="/recipe/create" element={<RecipeForm />} />
						</Routes>
					</RecipeProvider>
				</main>
			</div>
		</BrowserRouter>
	);
}