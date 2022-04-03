import { Button } from "antd";
import React from "react";
import { Logo } from "../Logo";
import s from "./styles.module.css";
import cn from 'classnames';
import { FileOutlined, GithubOutlined, HomeOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

export const Header = ({user, onUpdateUser, onUpdateAvatar}) => {

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
				<div className={s.menu}>
					<Button type="link">{<HomeOutlined />}Home</Button>
					<Button type="link">{<FileOutlined />}Remix Docs</Button>
					<Button type="link">{<GithubOutlined />}GitHub</Button>
				</div>
				<div className={s.user}>
					{user.avatar && <img src={user.avatar} alt="аватар" className={s.avatar}/>}
					<div className={s.userInfo}>
						{user.email && <span><MailOutlined style={{color:'blue'}}/> {user.email}</span>}
						{user.name && <span><UserOutlined style={{color:'blue'}}/> {user.name}</span>}
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