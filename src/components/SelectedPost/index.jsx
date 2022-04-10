import { Button, Card, Tag, Timeline } from "antd";
import React, {useContext} from "react";
import s from "./styles.module.css";
import dayjs from "dayjs";
import { HeartOutlined, HeartFilled, DeleteTwoTone, EditTwoTone, MessageTwoTone, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/currentUserContext";


export const SelectedPost = ({ image, likes, tags, _id, title, text, created_at, updated_at, onPostLike, onDeletePost, author }) => {

	const currentUser = useContext(CurrentUserContext);

	const navigate = useNavigate();
	const isLiked = likes?.some(id => id === currentUser._id);

	function handleClickBack() {
		navigate(-1);
	}

	function handlelikeClick() {
		onPostLike({_id, likes});
	}

	function handleDeleteClik() {
		onDeletePost({_id})
	}

	return (
		<div className="container">
			<Button type="link" className={s.button_back} onClick={handleClickBack}><ArrowLeftOutlined />Back</Button>
			<h1 className={s.postTitle}>{title}</h1>
			<div className={s.content}>

					<div>
						<div className={s.author}>
							<img src={author?.avatar} alt="аватар" className={s.avatar}/> 
							<span className={s.email}>{author?.email}</span>
						</div>
						<div className={s.tags}>
							<p>Tags:</p>
							<div className={s.tag}>
								{tags && tags.map(tag => <Tag color="cyan" key={`${tag}_${_id}`}>{tag}</Tag>)}
							</div>
						</div>
					</div>

					<Timeline className={s.timeline}>
		 				<Timeline.Item>Create: {dayjs(created_at).format('HH:MM:ss DD/MM/YYYY')}</Timeline.Item>
		 				<Timeline.Item color='var(--button-darker)'>Last edit: {dayjs(updated_at).format('HH:MM:ss DD/MM/YYYY')}</Timeline.Item>
		 			</Timeline>

					 <div className={s.buttons}>
					 	<Button className={s.button} type="text" onClick={handleDeleteClik} icon={<MessageTwoTone twoToneColor="#b1aeae" style={{ fontSize: '20px'}}/>}>Comment</Button>
						{author._id == currentUser._id && <Button className={s.button} type="text" onClick={handleDeleteClik} icon={<DeleteTwoTone twoToneColor="#b1aeae" style={{ fontSize: '20px'}}/>}>Delete</Button>}
						{author._id == currentUser._id && <Button className={s.button} type="text" onClick={handleDeleteClik} icon={<EditTwoTone twoToneColor="#b1aeae" style={{ fontSize: '20px'}}/>}>Edit</Button>}
					</div>


					<div className={s.like}>
						<span>{isLiked ? "In favorites" : "To favourites"}</span>
						<div>
							<Button type="text" onClick={handlelikeClick} icon={isLiked ? <HeartFilled style={{fontSize: '20px', color: '#f02573'}}/> : <HeartOutlined style={{ fontSize: '20px', color: '#b1aeae'}}/>}></Button>
							<span className={s.likeAmount}>{likes?.length}</span>
						</div>
		 			</div>

					<img src={image} className={s.image}/>

					<p className={s.text}>{text}</p>

					
			</div>
			<div className={s.comments}>

			</div>
		</div>
	)
}