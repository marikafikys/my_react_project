import { Button } from 'antd';
import React from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PostsList } from './components/PostsList';

export const App = () => {

	const handleClickCreate = () => {
		console.log('Кнопка нажата');
	}

	return (
		<>
			<Header/>
			<main className='container content'>
			/* Breadcrumb */
			<div className='content__about'>
				<div className='content__greeting'>
					<h2>Welcome to Our Site!</h2>
					<p>We're stoked that you're here. 🥳</p>
				</div>
				<Button
					className='btn btn__create'
					onClick={handleClickCreate}
					>Create post
					</Button>
			</div>
			<div className='content__posts'>
				<PostsList/>
			</div>
			
			</main>
			<Footer/>
		</>
	)
}