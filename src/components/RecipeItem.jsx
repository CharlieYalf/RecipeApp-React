import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RecipeContext } from "../state/RecipeContext";
import "../styles/RecipeItem.css";

const RecipeItem = ({ recipe, onEditClick, onDeleteClick }) => {
	const { name, ingredients, instructions, time, url, id } = recipe;
	const { fetchRecipe } = useContext(RecipeContext);

	const handleViewDetailsClick = (id) => {
		fetchRecipe(id);
	};

	return (
		<div className="recipe-item">
			<h2 className="recipe-item__name">{name}</h2>

			<p className="recipe-item__time">{time} minutes</p>
			<div className="recipe-item__buttons">
				<button className="recipe-item__button" onClick={onDeleteClick}>
					Delete
				</button>
				<Link to={`/recipe/${recipe._id}`}>
					<button
						className="recipe-item__button"
						onClick={() => handleViewDetailsClick(recipe._id)}
					>
						View Details
					</button>
				</Link>
			</div>
		</div>
	);
};

export default RecipeItem;