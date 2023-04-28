import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecipeSearch() {
	const [searchText, setSearchText] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		navigate(`/recipe/search?q=${searchText}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" placeholder="Search Recipes" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
			<button type="submit">Search</button>
		</form>
	);
}