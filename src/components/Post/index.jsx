import { Button, Card, Tag, Timeline } from "antd";
import React, { useContext } from "react";
import s from "./styles.module.css";
import dayjs from "dayjs";
import { HeartOutlined, HeartFilled, DeleteTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/currentUserContext";


export const Post = ({image, likes, tags, _id, title, author, text, created_at, updated_at, onPostLike, onDeletePost}) => {

	const currentUser = useContext(CurrentUserContext);

	const isLiked = likes.some(id => id === currentUser._id);

	function handlelikeClick() {
		onPostLike({_id, likes})
	}

	function handleDeleteClik() {
		onDeletePost({_id})
	}

	return (
		<Card title={<Button type="link">{title}</Button>} style={{ width: 300 }} hoverable='true'>

				<Link to={`/post/${_id}`} className={s.link}>
					<div className={s.wrapper}>
						<div className={s.author}>
							<img src={author?.avatar} alt="аватар" className={s.avatar}/> 
							<span className={s.email}>{author?.email}</span>
						</div>
						<img src={image} className={s.image}/>
						<p className={s.text}>{text}</p>
					</div>
					<div className={s.tags}>
						<p>Tags:</p>
						<div className={s.tag}>
							{tags && tags.map(tag => <Tag color="cyan" key={`${tag}_${_id}`}>{tag}</Tag>)}
						</div>
					</div>
					<Timeline className={s.timeline}>
						<Timeline.Item>Create: {dayjs(created_at).format('HH:MM:ss DD/MM/YYYY')}</Timeline.Item>
						<Timeline.Item color='var(--button-darker)'>Last edit: {dayjs(updated_at).format('HH:MM:ss DD/MM/YYYY')}</Timeline.Item>
					</Timeline>
				</Link>

			
			<div className={s.buttons}>
				<div className={s.like}>
					<Button type="text" onClick={handlelikeClick} icon={isLiked ? <HeartFilled style={{fontSize: '20px', color: '#f02573'}}/> : <HeartOutlined style={{ fontSize: '20px', color: '#b1aeae'}}/>}></Button>
					<span className={s.likeAmount}>{likes.length}</span>
				</div>
				{author._id == currentUser._id && <Button type="text" onClick={handleDeleteClik} icon={<DeleteTwoTone twoToneColor="#b1aeae" style={{ fontSize: '20px'}}/>}/>}
			</div>
    	</Card>
	)
}