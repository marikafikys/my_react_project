import React from "react";
import { CreatePostForm } from '../../components/CreatePostForm/CreatePostForm';

export const CreatePostPage = ({createNewPost}) => {

	return (
		<CreatePostForm createNewPost={createNewPost}/>
	)
}