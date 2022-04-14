import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import api from './utils/Api';
import { PostPage } from './pages/PostPage/PostPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AllPostPage } from './pages/AllPostsPage/AllPostPage';
import { CurrentUserContext } from './context/currentUserContext';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { CreatePostPage } from './pages/CreatePostPage/CreatePostPage';
import { EditPostPage } from './pages/EditPostPage/EditPostPage';

export const App = () => {
	const [currentUser, setCurrentUser] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [allPosts, setAllPosts] = useState([]);
	const [postsPerPage, setPostsPerPage] = useState(9);
	const [pagePosts, setPagePosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageMode, setPageMode] = useState("home");
	const [modalActive, setModalActive] = useState(false);

	const navigate = useNavigate();
	let countPosts = 1;

	useEffect(() => {
		setIsLoading(true);
		Promise.all([api.getPostsList(), api.getUserInfo()])
			.then(([allPostsData, userData]) => {
				setAllPosts(allPostsData);
				setPagePosts(allPostsData.slice(0, postsPerPage));
				setCurrentUser(userData);
			})
			.catch(err => console.log(err))
			.finally(() => setIsLoading(false))
	}, [])
	
	countPosts = allPosts.length;
	
	function handleHomePage() {
		setPageMode("home");
		api.getPostsList()
			.then(allPostsData => {
				setAllPosts(allPostsData);
				setPagePosts(allPostsData.slice(0, postsPerPage))
			})
		navigate("/");
	}

	function filterFavoritesData (data) {
		return data.filter(el => el.likes.some(id => id === currentUser._id));
	}

	function handleFavorites() {
		setPageMode("favorites");
		api.getPostsList()
			.then(allPosts => {
			const filteredFavoritesData = filterFavoritesData(allPosts);
			let pageFavPosts = filteredFavoritesData.slice(0, postsPerPage);
			setAllPosts(filteredFavoritesData);
			setPagePosts(pageFavPosts);
			navigate("/");
		})
	}

	function filterMyPostsData (data) {
		return data.filter(el => el.author._id === currentUser._id);
	}

	function handleMyPosts () {
		setPageMode("myPosts");
		api.getPostsList()
			.then(allPosts => {
			let filteredMyPostsData = filterMyPostsData(allPosts);
			// console.log(filteredMyPostsData);
			let pageMyPosts = filteredMyPostsData.slice(0, postsPerPage);
			setAllPosts(filteredMyPostsData);
			setPagePosts(pageMyPosts);
			navigate("/");
		})
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
			navigate("/");
			api.deletePost(_id)
				.then(deletedPost => {
					api.getPostsList()
						.then(data => {
							let currentData = data;
							if(pageMode === "home") {/* currentData не меняется */};
							if (pageMode === "favorites") {currentData = filterFavoritesData(data)};
							if (pageMode === "myPosts") {currentData = filterMyPostsData(data)};
							setPagePosts(updatePageDelete(currentData, currentPage, postsPerPage));
							countPosts = currentData.length;
							setCurrentPage(updateCurrentPage(countPosts, currentPage, postsPerPage));
							setAllPosts(currentData);
						})
				})
		}
	}

	const handleClickCreate = () => {
		navigate("/create");
	}

	function handleCreatePost(data) {
		api.createPost(data)
			.then((newPost) => {
				navigate(`/post/${newPost._id}`);
				api.getPostsList()
				.then(data => {
					let currentData = data;
					if(pageMode === "home") {/* currentData не меняется */};
					if (pageMode === "favorites") {currentData = filterFavoritesData(data)};
					if (pageMode === "myPosts") {currentData = filterMyPostsData(data)};
					setPagePosts(updatePageDelete(currentData, currentPage, postsPerPage));
					countPosts = currentData.length;
					setCurrentPage(updateCurrentPage(countPosts, currentPage, postsPerPage));
					setAllPosts(currentData);
				})
			})
	}

	const handleClickEdit = ({_id}) => {
		navigate(`/post/${_id}/edit`);
	}

	function handleEditPost(data, id) {
		api.editPost(data, id)
			.then((editPost) => {
				navigate(`/post/${id}`);
				api.getPostsList()
				.then(data => {
					let currentData = data;
					if(pageMode === "home") {/* currentData не меняется */};
					if (pageMode === "favorites") {currentData = filterFavoritesData(data)};
					if (pageMode === "myPosts") {currentData = filterMyPostsData(data)};
					setPagePosts(updatePageDelete(currentData, currentPage, postsPerPage));
					setAllPosts(currentData);
				})
			})
	}

	function createPostComment(data, id) {
		api.setPostComment(data, id)
			.then((editPost) => {
				setModalActive(false);
				api.getPostsList()
				.then(data => {
					let currentData = data;
					if(pageMode === "home") {/* currentData не меняется */};
					if (pageMode === "favorites") {currentData = filterFavoritesData(data)};
					if (pageMode === "myPosts") {currentData = filterMyPostsData(data)};
					setPagePosts(updatePageDelete(currentData, currentPage, postsPerPage));
					setAllPosts(currentData);
				})
			})
	}

	function deletePostComment(post_id, com_id) {
		api.deletePostComment(post_id, com_id)
			.then((editPost) => {
				api.getPostsList()
				.then(data => {
					let currentData = data;
					if(pageMode === "home") {/* currentData не меняется */};
					if (pageMode === "favorites") {currentData = filterFavoritesData(data)};
					if (pageMode === "myPosts") {currentData = filterMyPostsData(data)};
					setPagePosts(updatePageDelete(currentData, currentPage, postsPerPage));
					setAllPosts(currentData);
				})
			})
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<Header 
				onUpdateUser={handleUpdateUser}
				onUpdateAvatar={handleUpdateAvatar}
				handleHomePage={handleHomePage}
				handleFavorites={handleFavorites}
				handleMyPosts={handleMyPosts}
				pageMode={pageMode}
			/>
			<main className='container content'>
				
				<Routes>

					<Route path='/' element={
						<AllPostPage 
							isLoading={isLoading}  
							data={allPosts} 
							postsPerPage={postsPerPage} 
							pagePosts={pagePosts} 
							currentPage={currentPage} 
							handlePostLike={handlePostLike} 
							handleDeletePost={handleDeletePost} 
							onChangePage={onChangePage} 
							countPosts={countPosts} 
							handleClickCreate={handleClickCreate}
							pageMode={pageMode}
							active={modalActive}
							setActive={setModalActive}
						/>
					}/>

					<Route path='/post/:postID' element={
						<PostPage  
							isLoading={isLoading} 
							handlePostLike={handlePostLike} 
							handleDeletePost={handleDeletePost}
							handleClickEdit={handleClickEdit}
							active={modalActive}
							setActive={setModalActive}
							createPostComment={createPostComment}
							deletePostComment={deletePostComment}
						/>
					}/>

					<Route path='/post/:postID/edit' element={
						<EditPostPage   
							editPost={handleEditPost}
						/>
					}/>

					<Route path='/create' element={
						<CreatePostPage
						createNewPost={handleCreatePost}/>
					}/>

					<Route path="*" element={
						<NotFoundPage/>
					}/>

				</Routes>


			</main>
			<Footer/>
		</CurrentUserContext.Provider>
	)
}