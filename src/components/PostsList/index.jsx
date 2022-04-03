import React, { useState } from "react";
import "./styles.css";
import { Post } from "../Post";
import { Pagination } from "antd";
// import { postData } from '../../posts';


export const PostsList = ({onChangePage, postsData, pageData, elementsOnPage, onPostLike, currentUser, handleDeletePost, postsCount, currentPage}) => {
	console.log(currentPage);
	const handlePageChange = (defaultCurrent, pageSize) => {
		let newPageData = postsData.slice(pageSize*(defaultCurrent-1), pageSize*defaultCurrent);
		onChangePage(newPageData, defaultCurrent);
	}

	return (
		<>
		<div className="postsList">
			{pageData.map(el => <Post key={el._id} {...el} onPostLike={onPostLike} onDeletePost={handleDeletePost} currentUser={currentUser}/>)}
		</div>
		<div className="pagination">
			
			<Pagination onChange={handlePageChange} pageSize={elementsOnPage} total={postsCount} current = {currentPage}/>
		</div>
		</>
	)
}