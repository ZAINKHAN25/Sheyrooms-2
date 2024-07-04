import axios from "axios";
const { useState, useEffect } = require("react");

export const useAxios = (url) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		let current = true;
		setIsLoading(true);
		if (current) {
			(async () => {
				await axios
					.get(url)
					.then((res) => {
						setData(res.data);
						setIsLoading(false);
					})
					.catch((err) => {
						setError(err);
						setIsLoading(false);
					});
			})();
		}
		return () => (current = false);
	}, [url]);
	return {
		data,
		isLoading,
		error
	};
};
