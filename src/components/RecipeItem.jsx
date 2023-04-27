import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RecipeContext } from "../state/RecipeContext";

const RecipeItem = ({ recipe, onEditClick, onDeleteClick }) => {

	const { name, ingredients, instructions, time, id } = recipe;
	const { fetchRecipe } = useContext(RecipeContext);
	const handleViewDetailsClick = (id) => {
		fetchRecipe(id); // fetch the recipe with the selected ID
	};
	return (
		<div>
			<h2>{name}</h2>

			<p>{time} minutes</p>
			<button onClick={onEditClick}>Edit</button>
			<button onClick={onDeleteClick}>Delete</button>
			<Link to={`/recipe/${recipe._id}`}>
				<button onClick={() => handleViewDetailsClick(recipe._id)}>View Details</button>
			</Link>
		</div>
	);
};

export default RecipeItem;