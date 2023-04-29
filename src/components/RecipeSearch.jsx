import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../state/RecipeContext";
import "../styles/RecipeSearch.css";

export default function RecipeSearch() {
  const [searchText, setSearchText] = useState("");
  const { searchRecipes } = useContext(RecipeContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes(searchText).then(() => {
      navigate(`/recipe/search?q=${searchText}`);
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Recipes"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}