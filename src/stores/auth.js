import { defineStore } from 'pinia'
// import router from '@/router'
import { useRouter } from 'vue-router'
import { useApi } from '../api/useAPI'
import { useUserStore } from '../stores/user.js'
const api = useApi()

export const useAuthStore = defineStore({
	id: 'auth',

	state: () =>
		JSON.parse(localStorage.getItem('AUTH_STATE')) ?? {
			user: null,
			authenticated: false,
		},

	actions: {
		async csrf() {
			await api.get('sanctum/csrf-cookie')
		},
		updateState(payload) {
			let newUserState = { ...this.$state, ...payload }
			localStorage.removeItem('AUTH_STATE')
			localStorage.setItem('AUTH_STATE', JSON.stringify(newUserState))
			this.$reset()
		},
		async login({ email, password, accountNumber }) {
			const user = useUserStore()
			try {
				await this.csrf()
				await api.post('/login', { email, password, accountNumber })
				this.updateState({ email, authenticated: true })
				await user.storeInfo()
			} catch (error) {
				console.log('Error at login: ', error.message)
				throw error
			}
		},
		async register(props) {
			const user = useUserStore()
			try {
				await this.csrf()
				await api.post('/register', props)
				this.updateState({ email: props.email, authenticated: true })
				await user.storeInfo()
			} catch (error) {
				console.log('Error at register: ', error.message)
				throw error
			}
		},
		async forgotPassword({ email }) {
			try {
				await this.csrf()
				await api.post('/forgot-password', { email })
			} catch (error) {
				console.log('ERROR WITH FORGOT-PASSWORD ENDPOINT: ', error.message)
				throw error
			}
		},

		async logout() {
			const user = useUserStore()
			const router = useRouter()

			localStorage.clear() // always clean localStorage before reset the state
			this.$reset()
			user.$reset()

			try {
				await this.csrf()
				await api.post('/logout')
				await router.push({ name: 'login' })
			} catch (error) {
				window.location.pathname = '/login'
			}
		},
	},
})
