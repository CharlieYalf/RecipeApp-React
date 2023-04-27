import React, { useContext } from "react";
import { RecipeContext } from "../state/RecipeContext";
import RecipeItem from "./RecipeItem";

export default function RecipeList() {
	const { recipes, loading, error, setSelectedRecipe, deleteRecipe } = useContext(
		RecipeContext
	);

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

	return (
		<div>
			{recipes.map((recipe) => (
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