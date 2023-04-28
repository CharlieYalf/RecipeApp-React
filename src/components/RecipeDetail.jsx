import React, { useContext } from "react";
import { RecipeContext } from "../state/RecipeContext";
import "../styles/RecipeDetail.css"

export default function RecipeDetail({ match }) {
	console.log(match)
	const { selectedRecipe, loading, error } = useContext(RecipeContext);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error || !selectedRecipe) {
		return <div>{`Error: ${error}`}</div>;
	}
	const { name, ingredients, instructions, time, location } = selectedRecipe;

	return (
		<div className="recipe-detail">
			<div className="recipe-detail__header">
				<h2 className="recipe-detail__title">{name}</h2>
			</div>

			<div className="recipe-detail__body">
				<div className="recipe-detail__ingredients">
					{location}
				</div>
				<div className="recipe-detail__time">
					<span className="recipe-detail__icon" role="img" aria-label="Time icon">
						🕓
					</span>
					<span className="recipe-detail__label">Time:</span> {time} minutes
				</div>
				<div className="recipe-detail__ingredients">
					<span className="recipe-detail__icon" role="img" aria-label="Ingredients icon">
						🧄
					</span>
					<span className="recipe-detail__label">Ingredients:</span>
					<ul className="recipe-detail__list">
						{ingredients.map((ingredient, index) => (
							<li key={index} className="recipe-detail__item">
								{ingredient}
							</li>
						))}
					</ul>
				</div>
				<div className="recipe-detail__instructions">
					<span className="recipe-detail__icon" role="img" aria-label="Instructions icon">
						📝
					</span>
					<span className="recipe-detail__label">Instructions:</span>
					<ol className="recipe-detail__list">
						{instructions.map((instruction, index) => (
							<li key={index} className="recipe-detail__item">
								{instruction}
							</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
}