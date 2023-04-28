import React, { useState, useContext, useEffect } from "react";
import { RecipeContext } from "../state/RecipeContext";
import "../styles/RecipeForm.css";

const RecipeForm = () => {
	const { selectedRecipe, postRecipe, editRecipe } = useContext(RecipeContext);

	const [name, setName] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const [instructions, setInstructions] = useState([]);
	const [time, setTime] = useState("");
	const [location, setLocation] = useState("");

	// update state if there is a selected recipe
	useEffect(() => {
		if (selectedRecipe) {
			setName(selectedRecipe.name);
			setIngredients(selectedRecipe.ingredients);
			setInstructions(selectedRecipe.instructions);
			setTime(selectedRecipe.time);
			setLocation(selectedRecipe.location);
		} else {
			setName("");
			setIngredients([]);
			setInstructions([]);
			setTime("");
			setLocation("");
		}
	}, [selectedRecipe]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const newRecipe = {
			name,
			ingredients,
			instructions,
			time,
			location
		};
		if (selectedRecipe) {
			editRecipe(selectedRecipe._id, newRecipe);
		} else {
			postRecipe(newRecipe);
		}
		setName("");
		setIngredients([]);
		setInstructions([]);
		setTime("");
		setLocation("");
	};

	const handleIngredientChange = (event, index) => {
		const newIngredients = [...ingredients];
		newIngredients[index] = event.target.value;
		setIngredients(newIngredients);
	};

	const handleAddIngredient = () => {
		setIngredients([...ingredients, ""]);
	};

	const handleRemoveIngredient = (index) => {
		const newIngredients = [...ingredients];
		newIngredients.splice(index, 1);
		setIngredients(newIngredients);
	};

	const handleInstructionChange = (event, index) => {
		const newInstructions = [...instructions];
		newInstructions[index] = event.target.value;
		setInstructions(newInstructions);
	};

	const handleAddInstructionField = () => {
		setInstructions([...instructions, ""]);
	};

	const handleRemoveInstructionField = (index) => {
		const newInstructions = [...instructions];
		newInstructions.splice(index, 1);
		setInstructions(newInstructions);
	};

	return (
		<div className="recipe-form">
			<h2 className="recipe-form__title">{selectedRecipe ? "Edit" : "Add"} Recipe</h2>
			<form onSubmit={handleSubmit}>
				<div className="recipe-form__field">
					<label className="recipe-form__label" htmlFor="name">
						Name:
					</label>
					<input
						className="recipe-form__input"
						type="text"
						name="name"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</div>

				<div className="recipe-form__field">
					<label className="recipe-form__label" htmlFor="ingredients">
						Ingredients:
					</label>
					{ingredients.map((ingredient, index) => (
						<div key={index} className="recipe-form__ingredient">
							<input
								className="recipe-form__input"
								type="text"
								value={ingredient}
								onChange={(event) => handleIngredientChange(event, index)}
							/>
							<button
								className="recipe-form__ingredient-button"
								type="button"
								onClick={() => handleRemoveIngredient(index)}
							>
								-
							</button>
						</div>
					))}
					<button
						className="recipe-form__ingredient-button"
						type="button"
						onClick={handleAddIngredient}
					>
						+
					</button>
				</div>
				<div className="recipe-form__field">
					<label className="recipe-form__label" htmlFor="instructions">
						Instructions:
					</label>
					{instructions.map((instruction, index) => (
						<div key={index} className="recipe-form__instruction">
							<textarea
								className="recipe-form__input"
								type="text"
								value={instruction}
								onChange={(event) => handleInstructionChange(event, index)}
							></textarea>
							<button
								className="recipe-form__instruction-button"
								type="button"
								onClick={() => handleRemoveInstructionField(index)}
							>
								-
							</button>
						</div>
					))}
					<button
						className="recipe-form__instruction-button"
						type="button"
						onClick={handleAddInstructionField}
					>
						+
					</button>
				</div>

				<div className="recipe-form__field">
					<label className="recipe-form__label" htmlFor="time">
						Time (minutes):
					</label>
					<input
						className="recipe-form__input"
						type="number"
						name="time"
						value={time}
						min="1"
						onChange={(event) => setTime(event.target.value)}
					/>
				</div>
				<div className="recipe-form__field">
					<label className="recipe-form__label" htmlFor="location">
						Location
					</label>
					<input
						className="recipe-form__input"
						type="text"
						name="location"
						value={location}
						onChange={(event) => setLocation(event.target.value)}
					/>
				</div>
				<button className="recipe-form__button" type="submit">
					{selectedRecipe ? "Save Changes" : "Add Recipe"}
				</button>
			</form>
		</div>
	);
};

export default RecipeForm;