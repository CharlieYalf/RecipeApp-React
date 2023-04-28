import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { RecipeContext } from "../state/RecipeContext";
import RecipeItem from "./RecipeItem";

export default function RecipeList() {
	const { recipes, loading, error, setSelectedRecipe, deleteRecipe } = useContext(
		RecipeContext
	);
	const { search } = useLocation();

	const handleEditClick = (recipe) => {
		setSelectedRecipe(recipe);
	};

	const handleDeleteClick = (id) => {
		deleteRecipe(id);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{`Error: ${error}`}</div>;
	}

	const query = new URLSearchParams(search).get("q");

	const filteredRecipes = query
		? recipes.filter(recipe => recipe.name.toLowerCase().includes(query.toLowerCase()))
		: recipes;

	if (filteredRecipes.length === 0 && query) {
		return <div>No recipes found matching search parameters</div>; // Display 404 error message here
	}

	return (
		<div>
			{filteredRecipes.map((recipe, index) => (
				<RecipeItem
					key={recipe._id}
					recipe={recipe}
					onEditClick={() => handleEditClick(recipe)}
					onDeleteClick={() => handleDeleteClick(recipe._id)}
				/>
			))}
		</div>
	);
}