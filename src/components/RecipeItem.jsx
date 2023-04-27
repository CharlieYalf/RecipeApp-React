import React from "react";

const RecipeItem = ({ recipe }) => {
	const { name, ingredients, instructions, time } = recipe;
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
		</div>
	);
};

export default RecipeItem;