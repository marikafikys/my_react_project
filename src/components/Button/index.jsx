import React from "react";
import s from "./styles.module.css";
import cn from 'classnames';

import { Button } from 'antd';

export const Button = ({children}) => {
	return (
		<Button
		// className={cn(
		// 	btn
		// )}
		>
			{children}
		</Button>
	)
}