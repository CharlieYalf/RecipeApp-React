import React, { useContext } from "react";
import { RecipeContext } from "../state/RecipeContext";
import RecipeItem from "./RecipeItem";

const RecipeList = () => {
	const { recipes, loading, error } = useContext(RecipeContext);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div>
			{recipes.map((recipe) => (
				<RecipeItem key={recipe._id} recipe={recipe} />
			))}
		</div>
	);
};

export default RecipeList;