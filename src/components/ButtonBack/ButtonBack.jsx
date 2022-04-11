import { Button } from "antd";
import React from "react";
import s from "./styles.module.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


export const ButtonBack = () => {

	const navigate = useNavigate();
	
	function handleClickBack() {
		navigate(-1);
	}

	return (
			<Button type="link" className={s.button_back} onClick={handleClickBack}><ArrowLeftOutlined />Back</Button>
	)		
}