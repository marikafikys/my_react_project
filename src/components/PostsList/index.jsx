import React from "react";
import "./styles.css";
import { postData } from "../../posts";
import { Post } from "../Post";
import { Pagination } from "antd";

export const PostsList = () => {
	return (
		<>
		<div className="postsList">
			{postData.map(el => {
				return (<Post key={el._id} {...el}/>)
			})}
		</div>
		<div className="pagination">
			<Pagination simple defaultCurrent={1} total={5} />
		</div>
		</>
	)
}