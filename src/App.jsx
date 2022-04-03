import { Button, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PostsList } from './components/PostsList';
import api from './utils/Api';

// const elementsOnPage = 9;
// let fullData = [];
// let pageData = [];
let countPosts = 1;
// let currentPostPage = 1;


export const App = () => {
	const [allPosts, setAllPosts] = useState([]);
	const [postsPerPage, setPostsPerPage] = useState(9);
	const [pagePosts, setPagePosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentUser, setCurrentUser] = useState({});
	// const [isLoading, setIsLoading] = useState(false); - стейт для спиннера

	useEffect(() => {
		Promise.all([api.getPostsList(), api.getUserInfo()])
			.then(([allPostsData, userData]) => {
				setAllPosts(allPostsData)
				setPagePosts(allPostsData.slice(0, postsPerPage))
				setCurrentUser(userData);
			})
	}, [])
	console.log("Я делаю рендер");
	countPosts = allPosts.length;

	const handleClickCreate = () => {
		console.log('Кнопка нажата');
	}

	function onChangePage(newPageData, current, pageSize) {
		setPagePosts(newPageData);
		setPostsPerPage(pageSize);
		setCurrentPage(current);
	}
	
	// обновление постов на текущей странице при удалении поста. Возвращает массив постов для текущей страницы, если это был последний пост на странице возвращает посты с предыдущей страницы
	function updatePageDelete(allPosts, currentPage, postsPerPage)
	{
		let newData = allPosts.slice(postsPerPage*(currentPage-1), postsPerPage*currentPage);
		let newCurrentPage = newData.length == 0? Math.max(1, currentPage - 1) : currentPage;
		if (newCurrentPage !== currentPage)
		{
			newData = allPosts.slice(postsPerPage*(newCurrentPage-1), postsPerPage*newCurrentPage);
		}
		return newData;
	}
	
	//обновление страницы после лайка
	function updatePageData(allPosts, currentPage, postsPerPage)
	{
		let newData = allPosts.slice(postsPerPage*(currentPage-1), postsPerPage*currentPage);
		return newData;
	}

	// возвращает индекс текущей страницы при удалении поста
	function updateCurrentPage(countPosts, currentPage, postsPerPage)
	{
		let newCurrentPage = Math.ceil(countPosts/postsPerPage) < currentPage? Math.max(1, currentPage - 1) : currentPage;
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
				const newPostsState = allPosts.map(post => {
					return post._id === newPost._id ? newPost : post;
				});
			setAllPosts(newPostsState);
			setPagePosts(updatePageData(newPostsState, currentPage, postsPerPage));
			});
			
	}

	function handleDeletePost({_id}) {
		const access = confirm('Подтвердите удаление поста');
		if(access){
			api.deletePost(_id)
				.then(deletedPost => {
					api.getPostsList()
						.then(data => {
							setPagePosts(updatePageDelete(data, currentPage, postsPerPage));
							countPosts = data.length;
							setCurrentPage(updateCurrentPage(countPosts, currentPage, postsPerPage));
							setAllPosts(data);
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
					pagePosts={pagePosts}
					allPosts={allPosts}  
					postsPerPage={postsPerPage}
					onPostLike={handlePostLike}
					currentUser={currentUser}
					handleDeletePost={handleDeletePost}
					countPosts={countPosts}
					currentPage = {currentPage} // отправляю индекс текущей страницы для корректной работы пагинации при удалении постов
					/>
			</div>
			
			</main>
			<Footer/>
		</>
	)
}