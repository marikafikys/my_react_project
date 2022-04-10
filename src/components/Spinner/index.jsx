import React from "react";
import s from "./styles.module.css";
import { Spin } from 'antd';

export const Spinner = ({isLoading}) => {
	return (
		<Spin className={s.spinner} spinning={isLoading} tip="Loading..."/>
	)
}