import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { PostsList } from '../../components/PostsList';
import { Spinner } from '../../components/Spinner';

export const AllPostPage = ({isLoading, data, postsPerPage, pagePosts, currentPage, handlePostLike, handleDeletePost, onChangePage, countPosts, handleClickCreate, pageMode}) => {

	return (
		<>
				<div className='content__info'>
					<div className='content__about'>
						{pageMode=="home" && <div className='content__greeting'>
							<h2>Welcome to Our Site!</h2>
							<p>We're stoked that you're here. 🥳</p>
						</div>}
						{pageMode=="favorites" && <div className='content__greeting'>
							<h2>All your favorites posts are here.</h2>
							<p>Enjoy! 🥳</p>
						</div>}
						{pageMode=="myPosts" && <div className='content__greeting'>
							<h2>All your posts are here.</h2>
							<p>Isn't it time for a new post? 🥳</p>
						</div>}
						<Button type='primary'
							onClick={handleClickCreate}
							><PlusOutlined />Create post
						</Button>
					</div>
				</div>
				<div className='content__posts'>
						<Spinner isLoading={isLoading}/>
					<PostsList 
						onChangePage={onChangePage}
						pagePosts={pagePosts}
						data={data}  
						postsPerPage={postsPerPage}
						onPostLike={handlePostLike}
						handleDeletePost={handleDeletePost}
						countPosts={countPosts}
						currentPage = {currentPage} // отправляю индекс текущей страницы для корректной работы пагинации при удалении постов
						/>
				</div>
		</>
	)
}