import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RecipeContext } from "../state/RecipeContext";

const RecipeItem = ({ recipe, onEditClick, onDeleteClick }) => {
	const { name, ingredients, instructions, time, id } = recipe;

	return (
		<div>
			<h2>{name}</h2>
			<h3>Ingredients:</h3>
			<ul>
				{ingredients.map((ingredient) => (
					<li key={ingredient}>{ingredient}</li>
				))}
			</ul>
			<h3>Instructions:</h3>
			<ol>
				{instructions.map((instruction) => (
					<li key={instruction}>{instruction}</li>
				))}
			</ol>
			<p>{time} minutes</p>
			<button onClick={onEditClick}>Edit</button>
			<button onClick={onDeleteClick}>Delete</button>
		</div>
	);
};

export default RecipeItem;