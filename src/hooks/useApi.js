import React, { useState, useEffect } from 'react';

export const useApi = (handler) => {

	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		setLoading(true);
		handler()
			.then(result => setData(result))
			.catch(err => setError(err))
			.finally(() => {setLoading(false)})
	}, [handler])

	return {data, loading, error}
}