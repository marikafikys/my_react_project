import { Button, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PostsList } from './components/PostsList';
import api from './utils/Api';

const elementsOnPage = 9;
let fullData = [];
let pageData = [];
let countPosts = 1;
let currentPostPage = 1;


export const App = () => {
	const [posts, setPosts] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	// const [isLoading, setIsLoading] = useState(false); - стейт для спиннера

	useEffect(() => {
		Promise.all([api.getPostsList(), api.getUserInfo()])
			.then(([allPostsData, userData]) => {
				fullData = allPostsData;
				pageData = allPostsData.slice(0, elementsOnPage);
				countPosts = fullData.length;
				//setPosts(pageData);
				setCurrentUser(userData)
			})
	}, [])

	const handleClickCreate = () => {
		console.log('Кнопка нажата');
	}

	function onChangePage(data, currentPage) {
		setPosts(data);
		pageData = data;
		currentPostPage = currentPage;
	}
	
	// обновление постов на текущей странице при удалении поста. Возвращает массив постов для текущей страницы, если это был последний пост на странице возвращает посты с предыдущей страницы
	function updatePageData(data, currentPage, pageSize)
	{
		let newData = data.slice(pageSize*(currentPage-1), pageSize*currentPage);
		let newCurrentPage = newData.length == 0? Math.max(1, currentPage - 1) : currentPage;
		if (newCurrentPage !== currentPage)
		{
			newData = data.slice(pageSize*(newCurrentPage-1), pageSize*newCurrentPage);
		}
		return newData;
	}
	
	// возвращает индекс текущей страницы при удалении поста
	function updateCurrentPage(postsCount, currentPage, pageSize)
	{
		let newCurrentPage = Math.ceil(postsCount/pageSize) < currentPage? Math.max(1, currentPage - 1) : currentPage;
		return newCurrentPage;
	}

	function handleUpdateUser(userUpdate) {
		api.setUserInfo(userUpdate).then((newUserData) => {setCurrentUser(newUserData)})
	}

	function handleUpdateAvatar(avatarUpdate) {
		api.setUserAvatar(avatarUpdate).then((newUserAvatar) => {setCurrentUser(newUserAvatar)})
	}

	function handlePostLike({_id, likes}) {
		const isLiked = likes.some(id => id === currentUser._id);
		api.changeLikeStatus(_id, isLiked)
			.then((newPost) => {
				const newPostsState = posts.map(post => {
					return post._id === newPost._id ? newPost : post
				});
				setPosts(newPostsState);

			})
	}

	function handleDeletePost({_id}) {
		const access = confirm('Подтвердите удаление поста');
		if(access){
			api.deletePost(_id)
				.then(deletedPost => {
					api.getPostsList()
						.then(data => {
							fullData = data;
							pageData = updatePageData(data, currentPostPage, elementsOnPage);
							countPosts = fullData.length;
							currentPostPage = updateCurrentPage(countPosts, currentPostPage, elementsOnPage)
							setPosts(data);
						})
				});
		}
	}

	return (
		<>
			<Header 
				user={currentUser} 
				onUpdateUser={handleUpdateUser}
				onUpdateAvatar={handleUpdateAvatar}
			/>
			<main className='container content'>
			/* Breadcrumb */
			<div className='content__about'>
				<div className='content__greeting'>
					<h2>Welcome to Our Site!</h2>
					<p>We're stoked that you're here. 🥳</p>
				</div>
				<Button type='primary'
					onClick={handleClickCreate}
					>Create post
				</Button>
			</div>
			<div className='content__posts'>
				{/* <Spin tip="Loading..."/> */}
				<PostsList 
					onChangePage={onChangePage}
					pageData={pageData}
					postsData={fullData}  
					elementsOnPage={elementsOnPage}
					onPostLike={handlePostLike}
					currentUser={currentUser}
					handleDeletePost={handleDeletePost}
					postsCount={countPosts}
					currentPage = {currentPostPage} // отправляю индекс текущей страницы для корректной работы пагинации при удалении постов
					/>
			</div>
			
			</main>
			<Footer/>
		</>
	)
}