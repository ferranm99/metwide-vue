import axios from 'axios'
// import middleware401 from './middleware401'
/**
 * Initialize Axios instance to call the API
 * @returns {axiosInstance}
 */
export const useApi = () => {
	const VITE_API_HOST = import.meta.env.VITE_API_HOST
	const VITE_API_PATH = import.meta.env.VITE_API_PATH

	let baseURL

	baseURL = VITE_API_HOST + VITE_API_PATH

	const axiosInstance = axios.create({
		baseURL,
		headers: { 'X-Requested-With': 'XMLHttpRequest' },
		withCredentials: true,
	})

	axiosInstance.interceptors.response.use(resp => resp)

	return axiosInstance
}
