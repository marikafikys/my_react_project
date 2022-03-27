import React from "react";
import { Logo } from "../Logo";
import s from "./styles.module.css";
import cn from 'classnames';

export const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={cn(s.wrapper, 'container')}>
				<Logo/>
				<p>© Marina Yanysheva</p>
			</div>
		</footer>	
	)
}