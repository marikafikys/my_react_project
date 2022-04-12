import React from 'react';
import "./styles.css";
import cn from 'classnames';
import { AddCommentForm } from '../AddCommentForm/AddCommentForm';

export function Modal({active, setActive, createPostComment, id}) {
	return (
		<div 
			className={cn("modal", {
			"active": active
			})} 
			onClick={() => setActive(false)}
		>
			<div 
				className={cn("modal__content", {
					"active": active
					})}  
				onClick={(e)=> e.stopPropagation()}
			>
				<AddCommentForm createPostComment={createPostComment} id={id}/>
			</div>
		</div>
	)
}