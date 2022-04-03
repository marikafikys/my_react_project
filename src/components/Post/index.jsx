import { Button, Card, Tag, Timeline } from "antd";
import React from "react";
import s from "./styles.module.css";
import cn from "classnames";
import dayjs from "dayjs";
import { HeartOutlined, HeartFilled, DeleteTwoTone } from "@ant-design/icons";


export const Post = ({image, likes, tags, _id, title, author: {name, about, avatar, email}, text, created_at, updated_at, onPostLike, currentUser, onDeletePost}) => {

	const isLiked = likes.some(id => id === currentUser._id);

	function handlelikeClick() {
		onPostLike({_id, likes})
	}

	function handleDeleteClik() {
		onDeletePost({_id})
	}

	return (
		<Card title={<Button type="link">{title}</Button>} style={{ width: 300 }} hoverable='true'>
			<div className={s.wrapper}>
				<div className={s.author}>
					<img src={avatar} alt="аватар" className={s.avatar}/> 
					<span className={s.email}>{email}</span>
				</div>
				<img src={image} className={s.image}/>
				<p className={s.text}>{text}</p>
			</div>
			<div className={s.tags}>
				<div>
					<p>Tags:</p>
				</div>
				<div className={s.tag}>
				{tags && tags.map(tag => <Tag color="cyan" key={`${tag}_${_id}`}>{tag}</Tag>)}
					{/* <Tag color="cyan">{tags[0]}</Tag> */}
				</div>
			</div>
			<Timeline className={s.timeline}>
				<Timeline.Item>Create: {dayjs(created_at).format('HH:MM:ss DD/MM/YYYY')}</Timeline.Item>
				<Timeline.Item color='var(--button-darker)'>Last edit: {dayjs(updated_at).format('HH:MM:ss DD/MM/YYYY')}</Timeline.Item>
			</Timeline>
			<div className={s.buttons}>
				<Button type="text" onClick={handleDeleteClik} icon={<DeleteTwoTone twoToneColor="#b1aeae" style={{ fontSize: '20px'}}/>}/>
				<div className={s.like}>
					<Button type="text" onClick={handlelikeClick} icon={isLiked ? <HeartFilled style={{fontSize: '20px', color: '#f02573'}}/> : <HeartOutlined style={{ fontSize: '20px', color: '#b1aeae'}}/>}></Button>
					<span className={s.likeAmount}>{likes.length}</span>
				</div>
			</div>
    	</Card>
	)
}