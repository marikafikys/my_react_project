import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { EditPostForm } from "../../components/EditPostForm/EditPostForm";
import { useApi } from "../../hooks/useApi";
import api from '../../utils/Api';

export const EditPostPage = ({editPost}) => {

	const  { postID } = useParams();

	const handler = useCallback(() => {
		return api.getPostById(postID)
	}, [postID]);

	const { data: editPostData, loading, error } = useApi(handler);

	return (
		<EditPostForm editPostData={editPostData} editPost={editPost} id={postID}/>
	)
}