import React, {useState, useEffect} from "react";
import s from "./styles.module.css";
import dayjs from "dayjs";
import { Button } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import api from "../../utils/Api";

export const CommentEl = ({currentUser, comment, post_id, com_id, deletePostComment }) => {

	const [commentUser, setCommentUser] = useState({});

	useEffect(() => {
		api.getUserById(comment.author)
			.then(data => {
				setCommentUser(data);
			})
			.catch(err => console.log(err));
	}, []) 

	// console.log(commentUser?.name);

	function handleDeleteCommentClik() {
		deletePostComment(post_id, com_id);
	}

	return (
		<div key={comment._id} className={s.comment}>
			<div className={s.info__comment}>
				<div className={s.author__comment}>
					<img src={commentUser?.avatar} alt="аватар" className={s.avatar}/> 
					<span>
						<div className={s.name}><b>Name: </b>{commentUser?.name}</div>
						<div className={s.time__comment}><b>Created at: </b>{dayjs(comment.created_at).format('HH:MM:ss DD/MM/YYYY')}</div>
					</span>
				</div>
			</div>
			<div className={s.body__comment}>
				<p className={s.text__comment}>{comment.text}</p>
				{comment.author == currentUser._id && <Button className={s.button} type="text" onClick={handleDeleteCommentClik} icon={<DeleteTwoTone twoToneColor="#b1aeae" style={{ fontSize: '20px'}}/>}></Button>}
			</div>
		</div>
	)
}