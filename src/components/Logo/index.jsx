import React from "react";
import "./styles.css";
import logo from './img/Logo.png';

export const Logo = () => {
	return (
		<a href="/" className="logo">
			<img src={logo} alt="logo" className="logo__pic"/>
			Remix
		</a>	
	)
}