import { Card, Tag, Timeline } from "antd";
import React from "react";
import s from "./styles.module.css";

var dayjs = require('dayjs');

export const Post = ({image, _id, title, text, author, tags, created_at, updated_at}) => {
	return (
		// <div className="post">
		// 	<h3>{title}</h3>
		// 	{/* Avatar */}
		// 	<div className="post__author">
		// 		<img src={image} alt="аватар" className="post__avatar"/> 
		// 		<span className="post__email">{{...author}.email}</span>
		// 	</div>
		// 	<p>{text}</p>
		// 	/* Tag */
		// 	/* Timeline */
		// </div>

		<Card title={title} style={{ width: 300 }} hoverable='true'>
			<div className={s.author}>
		 		<img src={image} alt="аватар" className={s.avatar}/> 
		 		<span className={s.email}>{{...author}.email}</span>
			</div>
		 	<p className={s.text}>{text}</p>
			<div className={s.tags}>
				<div>
					<p>Tags:</p>
				</div>
				<div className={s.tag}>
				{tags.map(el => {
				return (<Tag color="cyan" key={`${el}_${_id}`}>{el}</Tag>)
			})}
					{/* <Tag color="cyan">{tags[0]}</Tag> */}
				</div>
			</div>
			<Timeline>
				<Timeline.Item>Create: {dayjs(created_at).format('HH:MM:ss DD/MM/YYYY')}</Timeline.Item>
				<Timeline.Item color='var(--button-darker)'>Last edit: {dayjs(updated_at).format('HH:MM:ss DD/MM/YYYY')}</Timeline.Item>
			</Timeline>
    	</Card>
	)
}