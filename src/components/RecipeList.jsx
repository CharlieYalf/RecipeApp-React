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
		setSelectedRecipe(recipe); // set the selected recipe to the clicked recipe
	};

	const handleDeleteClick = (id) => {
		deleteRecipe(id); // delete the recipe with the specified id
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

	return (
		<div>
			{filteredRecipes.map((recipe, index) => (
				<RecipeItem
					key={recipe._id}
					recipe={recipe}
					onEditClick={() => handleEditClick(recipe)} // pass function to handle edit clicks
					onDeleteClick={() => handleDeleteClick(recipe._id)} // pass function to handle delete clicks
				/>
			))}
		</div>
	);
}