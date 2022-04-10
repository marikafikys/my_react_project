import React from "react";
import s from "./styles.module.css";
import { FrownOutlined } from '@ant-design/icons';
import { Button } from "antd";

export const NotFound = ({children, title, buttonText, buttonAction}) => {
	return (
		<div className={s.notFound}>
			<h1 className={s.error}>404</h1>
			<h2 className={s.title}>{title} <FrownOutlined /></h2>
			{children}
			<Button type='primary' onClick={buttonAction}>{buttonText}</Button>
		</div>	
	)
}