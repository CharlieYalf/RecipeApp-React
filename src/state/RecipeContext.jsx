import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
	recipes: [],
	loading: true,
	error: null,
};

export const RecipeContext = createContext(initialState);

const reducer = (state, action) => {
	switch (action.type) {
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
		dispatch({
			type: "POST_RECIPES_REQUEST",
		});
		try {
			const response = await axios.post(
				"https://recipeapp-server.jordanmorris5.repl.co/api/recipes",
				recipe
			);
			dispatch({
				type: "POST_RECIPES_SUCCESS",
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: "POST_RECIPES_FAILURE",
				payload: error.message,
			});
		}
	};

	return (
		<RecipeContext.Provider value={{ ...state, postRecipe }}>
			{children}
		</RecipeContext.Provider>
	);
};