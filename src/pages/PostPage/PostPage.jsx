import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { SelectedPost } from '../../components/SelectedPost';
import { Spinner } from '../../components/Spinner';
import { useApi } from '../../hooks/useApi';
import api from '../../utils/Api';


export const PostPage = ({handlePostLike, handleDeletePost}) => {
	const  { postID } = useParams();

	const handler = useCallback(() => {
		return api.getPostById(postID)
	}, [postID, handlePostLike]);

	const { data: selectedPost, loading, error } = useApi(handler);

	return (
				<div className='content__posts'>
					<Spinner isLoading={loading}/>
					{selectedPost && <SelectedPost {...selectedPost} 
					onPostLike={handlePostLike} 
					onDeletePost={handleDeletePost}/>}
					{error && <NotFound title={"Page not found"} buttonText={"To Home Page"} buttonAction={() => navigate("/")}/>}
				</div>
	);
}