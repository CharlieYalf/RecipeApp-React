import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
	recipes: [],
	loading: true,
	error: null,
	selectedRecipe: null,
	searchResults: [],
};

export const RecipeContext = createContext(initialState);

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_RECIPE_SUCCESS":
			return {
				...state,
				selectedRecipe: action.payload,
				loading: false,
				error: null
			};
		case "FETCH_RECIPES_REQUEST":
			return {
				...state,
				loading: true,
				error: null,
			};
		case "FETCH_RECIPES_SUCCESS":
			return {
				...state,
				recipes: action.payload,
				loading: false,
			};
		case "FETCH_RECIPES_FAILURE":
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case "POST_RECIPES_REQUEST":
			return {
				...state,
				loading: true,
				error: null,
			};
		case "POST_RECIPES_SUCCESS":
			return {
				...state,
				recipes: [...state.recipes, action.payload],
				loading: false,
			};
		case "POST_RECIPES_FAILURE":
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case "EDIT_RECIPES":
			return {
				...state,
				recipes: state.recipes.map((recipe) =>
					recipe.id === action.payload._id ? action.payload : recipe
				),
			};
		case "SEARCH_RECIPES_SUCCESS":
			return {
				...state,
				searchResults: action.payload,
				loading: false,
			};
		case "SET_SELECTED_RECIPE":
			return {
				...state,
				selectedRecipe: action.payload,
			};
		case "DELETE_RECIPE":
			return {
				...state,
				recipes: state.recipes.filter((recipe) => recipe._id !== action.payload),
				selectedRecipe: state.selectedRecipe ? (state.selectedRecipe._id === action.payload ? null : state.selectedRecipe) : null
			};
		default:
			return state;
	}
};

export const RecipeProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({
			type: "FETCH_RECIPES_REQUEST",
		});
		axios
			.get("https://recipeapp-server.jordanmorris5.repl.co/api/recipes")
			.then((response) => {
				dispatch({
					type: "FETCH_RECIPES_SUCCESS",
					payload: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: "FETCH_RECIPES_FAILURE",
					payload: error.message,
				});
			});
	}, []);

	const postRecipe = async (recipe) => {
		dispatch({ type: "POST_RECIPES_REQUEST" });
		try {
			const response = await axios.post(
				"https://recipeapp-server.jordanmorris5.repl.co/api/recipes",
				recipe
			);
			dispatch({
				type: "POST_RECIPES_SUCCESS",
				payload: response.data,
			});
			dispatch({
				type: "SET_SELECTED_RECIPE",
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: "POST_RECIPES_FAILURE",
				payload: error.message,
			});
		}
	};

	const editRecipe = async (id, recipe) => {
		dispatch({ type: "EDIT_RECIPES_REQUEST" });
		try {
			const response = await axios.put(
				`https://recipeapp-server.jordanmorris5.repl.co/api/recipes/${id}`,
				recipe
			);
			dispatch({
				type: "EDIT_RECIPES_SUCCESS",
				payload: response.data,
			});
			dispatch({
				type: "SET_SELECTED_RECIPE",
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: "EDIT_RECIPES_FAILURE",
				payload: error.message,
			});
		}
	};

	const deleteRecipe = async (id) => {
		dispatch({
			type: "POST_RECIPES_REQUEST",
		});
		try {
			await axios.delete(
				`https://recipeapp-server.jordanmorris5.repl.co/api/recipes/${id}`
			);
			dispatch({
				type: "DELETE_RECIPE",
				payload: id,
			});
		} catch (error) {
			dispatch({
				type: "POST_RECIPES_FAILURE",
				payload: error.message,
			});
		}
	};
	const searchRecipes = async (query) => {
		dispatch({ type: "FETCH_RECIPES_REQUEST" });
		try {
			const response = await axios.get(
				`https://recipeapp-server.jordanmorris5.repl.co/api/recipes?q=${query}`
			);
			dispatch({
				type: "SEARCH_RECIPES_SUCCESS",
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: "FETCH_RECIPES_FAILURE",
				payload: error.message,
			});
		}
	};

	const fetchRecipe = async (id) => {
		dispatch({ type: "FETCH_RECIPE_REQUEST" });
		try {
			const { data } = await axios.get(
				`https://recipeapp-server.jordanmorris5.repl.co/api/recipes/${id}`
			);
			dispatch({ type: "FETCH_RECIPE_SUCCESS", payload: data });
		} catch (error) {
			dispatch({ type: "FETCH_RECIPE_FAILURE", payload: error.message });
		}
	};

	const setSelectedRecipe = (recipe) => {
		dispatch({
			type: "SET_SELECTED_RECIPE",
			payload: recipe,
		});
		console.log(recipe);
	};

	return (
		<RecipeContext.Provider value={{ ...state, postRecipe, editRecipe, setSelectedRecipe, deleteRecipe, fetchRecipe, searchRecipes }}>
			{children}
		</RecipeContext.Provider>
	);
};