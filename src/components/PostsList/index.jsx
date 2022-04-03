import React, { useState } from "react";
import "./styles.css";
import { Post } from "../Post";
import { Pagination } from "antd";
// import { postData } from '../../posts';


export const PostsList = ({pagePosts, allPosts, postsPerPage, onPostLike, currentUser, countPosts, currentPage, onChangePage, handleDeletePost}) => {
	const handlePageChange = (current, pageSize) => {
		let newPageData = allPosts.slice(pageSize*(current-1), pageSize*current);
		onChangePage(newPageData, current, pageSize);
	}

	return (
		<>
		<div className="postsList">
			{pagePosts.map(el => <Post key={el._id} {...el} onPostLike={onPostLike} 
			onDeletePost={handleDeletePost} 
			currentUser={currentUser}/>)}
		</div>
		<div className="pagination">
			
			<Pagination onChange={handlePageChange} pageSize={postsPerPage} pageSizeOptions={[3,6,9,12]} total={countPosts} current={currentPage}/>
		</div>
		</>
	)
}