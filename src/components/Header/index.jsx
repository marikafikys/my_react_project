import { Button } from "antd";
import React from "react";
import { Logo } from "../Logo";
import s from "./styles.module.css";
import cn from 'classnames';

export const Header = () => {
	return (
		<header className={s.header}>
			<div className={cn(s.wrapper, 'container')}>
				<Logo/>
				<div className={s.menu}>
					<Button type="link">Home</Button>
					<Button type="link">Remix Docs</Button>
					<Button type="link">GitHub</Button>
				</div>
			</div>
		</header>	
	)
}