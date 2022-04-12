import React, {useState, useContext} from "react";
import s from "./styles.module.css";
import dayjs from "dayjs";
import { Button } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

export const CommentEl = ({currentUser, comment, post_id, com_id, deletePostComment }) => {

	// const currentUser = useContext(CurrentUserContext);

	function handleDeleteCommentClik() {
		deletePostComment(post_id, com_id);
	}

	return (
		<div key={comment._id} className={s.comment}>
			<div className={s.info__comment}>
				<div>
					<div className={s.author__comment}><b>Author ID: </b>{comment.author}</div>
					<div className={s.time__comment}><b>Created at: </b>{dayjs(comment.created_at).format('HH:MM:ss DD/MM/YYYY')}</div>
				</div>
				{comment.author == currentUser._id && <Button className={s.button} type="text" onClick={handleDeleteCommentClik} icon={<DeleteTwoTone twoToneColor="#b1aeae" style={{ fontSize: '20px'}}/>}></Button>}
			</div>
			<p className={s.text__comment}>{comment.text}</p>
		</div>
	)
}