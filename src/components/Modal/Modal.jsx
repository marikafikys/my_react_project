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
			onMouseDown={() => setActive(false)}
		>
			<div 
				className={cn("modal__content", {
					"active": active
					})}  
					onMouseDown={(e)=> e.stopPropagation()}
			>
				<AddCommentForm createPostComment={createPostComment} id={id}/>
			</div>
		</div>
	)
}