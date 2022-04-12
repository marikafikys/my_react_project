import { Button } from "antd";
import React, { useContext } from "react";
import { Logo } from "../Logo";
import s from "./styles.module.css";
import cn from 'classnames';
import { HeartOutlined, SmileOutlined , HomeOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { CurrentUserContext } from "../../context/currentUserContext";
import { useNavigate } from "react-router-dom";

export const Header = ({onUpdateUser, onUpdateAvatar, handleHomePage, handleFavorites, handleMyPosts, pageMode}) => {

	const currentUser = useContext(CurrentUserContext);
	const navigate = useNavigate();

	function handleClickEditUser(e) {
		e.preventDefault();
		onUpdateUser({name:"Янышева Марина Евгеньевна", about: "Студент курса"})
	}

	function handleClickEditAvatar(e) {
		e.preventDefault();
		onUpdateAvatar({avatar: "https://dj-x.info/uploads/posts/2016-05/1462561296_d09ad0bed182d0b8d0ba-1.jpg"})
	}

	return (
		<header className={s.header}>
			<div className={cn(s.wrapper, 'container')}>
				<Logo/>
				<div>
					<Button className={s.menu} type={pageMode === "home" ? "dashed" : "link"} ghost onClick={handleHomePage}>{<HomeOutlined />}Home</Button>
					<Button className={s.menu} type={pageMode === "favorites" ? "dashed" : "link"} ghost onClick={handleFavorites}>{<HeartOutlined />}Favorites</Button>
					<Button className={s.menu} type={pageMode === "myPosts" ? "dashed" : "link"} ghost onClick={handleMyPosts}>{<SmileOutlined />}My posts</Button>
				</div>
				<div className={s.user}>
					{currentUser.avatar && <img src={currentUser.avatar} alt="аватар" className={s.avatar}/>}
					<div className={s.userInfo}>
						{currentUser.email && <span><MailOutlined style={{color:'blue'}}/> {currentUser.email}</span>}
						{currentUser.name && <span><UserOutlined style={{color:'blue'}}/> {currentUser.name}</span>}
					</div>
					<div className={s.buttons}>
						<Button 
							type="primary" 
							ghost
							onClick={handleClickEditUser}
						>Edit profile</Button>
						<Button 
							type="primary"
							ghost
							onClick={handleClickEditAvatar}
						>Edit photo</Button>
					</div>
				</div>
			</div>
		</header>	
	)
}