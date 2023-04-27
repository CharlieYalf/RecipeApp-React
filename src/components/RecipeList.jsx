import React, { useContext, Fragment } from "react";
import { RecipeContext } from "../state/RecipeContext";

function RecipeList() {

	const { recipes, loading, error } = useContext(RecipeContext);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<Fragment>
			<h1>Recipe List</h1>
			<ul>
				{recipes.map((recipe) => (
					<li key={recipe._id}>{recipe.name}</li>
				))}
			</ul>
		</Fragment >
	);

}

export default RecipeList;