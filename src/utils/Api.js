const onResponce = (res) => {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

class Api {
	constructor ({baseUrl, token}) {
		this._baseUrl = baseUrl;
		this._token = `Bearer ${token}`;
	}

	getPostsList() {
		return fetch(`${this._baseUrl}/posts`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce)
	}

	getPostById(postId) {
		return fetch(`${this._baseUrl}/posts/${postId}`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce)
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce)
	}

	setUserInfo(userData) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			headers: {
				authorization: this._token,
				"Content-type": "application/json"
			},
			body: JSON.stringify(userData)
		}).then(onResponce)
	}

	setUserAvatar(userAvatarData) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: "PATCH",
			headers: {
				authorization: this._token,
				"Content-type": "application/json"
			},
			body: JSON.stringify(userAvatarData)
		}).then(onResponce)
	}

	changeLikeStatus(postId, isLike) {
		return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
			method: isLike ? "DELETE" : "PUT",
			headers: {
				authorization: this._token,
			},
		}).then(onResponce)
	}
	
	deletePost(postId) {
		return fetch(`${this._baseUrl}/posts/${postId}`, {
			method: "DELETE",
			headers: {
				authorization: this._token,
			},
		}).then(onResponce)
	}
}

const config = {
	baseUrl: 'https://api.react-learning.ru',
	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiNmZmYzA5YjEyZjgwZjRjMTBiZDIiLCJpYXQiOjE2NDcwMTM4ODgsImV4cCI6MTY3ODU0OTg4OH0.MRhuBfoWE-NB7YQ9YarZTAanxr-TNrgACOrO-tbO2ss',
}

const api = new Api(config);

export default api;