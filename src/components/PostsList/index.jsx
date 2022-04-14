import React from "react";
import "./styles.css";
import { Post } from "../Post";
import { Pagination } from "antd";

export const PostsList = ({pagePosts, data, postsPerPage, onPostLike, countPosts, currentPage, onChangePage, handleDeletePost, active, setActive}) => {
	const handlePageChange = (current, pageSize) => {
		let newPageData = data.slice(pageSize*(current-1), pageSize*current);
		onChangePage(newPageData, current, pageSize);
	}

	return (
		<>
		<div className="postsList">
			{pagePosts.map(el => 
			<Post 
				key={el._id} 
				{...el} 
				onPostLike={onPostLike} 
				onDeletePost={handleDeletePost} 
				active={active} 
				setActive={setActive}/>)}
		</div>
		<div className="pagination">
			<Pagination 
			onChange={handlePageChange} 
			pageSize={postsPerPage}
			showSizeChanger 
			pageSizeOptions={[3,6,9,12]} 
			total={countPosts} 
			current={currentPage}/>
		</div>
		</>
	)
}