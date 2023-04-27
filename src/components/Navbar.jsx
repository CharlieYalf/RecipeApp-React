import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
	return (
		<div className="navbar">
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/recipes">Recipes</Link>
				</li>
			</ul>
		</div>
	)
}

export default Navbar;