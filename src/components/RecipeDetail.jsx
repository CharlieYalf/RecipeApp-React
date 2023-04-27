import React, { useContext } from "react";
import { RecipeContext } from "../state/RecipeContext";

export default function RecipeDetail({ match }) {
	console.log(match)
	const { selectedRecipe, loading, error } = useContext(RecipeContext);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error || !selectedRecipe) {
		return <div>{`Error: ${error}`}</div>;
	}
	const { name, ingredients, instructions, time } = selectedRecipe;
	return (
		<div>
			<h1>{name}</h1>
			<h2>Ingredients:</h2>
			<ul>
				{ingredients.map((ingredient) => (
					<li key={ingredient}>{ingredient}</li>
				))}
			</ul>
			<h2>Instructions:</h2>
			<ol>
				{instructions.map((instruction) => (
					<li key={instruction}>{instruction}</li>
				))}
			</ol>
		</div>
	);
}